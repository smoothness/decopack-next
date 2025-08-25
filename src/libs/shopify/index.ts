import { Connection, Menu, ShopifyMenuOperation, ShopifyProduct, ShopifyProductsOperation, Image, Product, Collection, ShopifyCollectionsOperation, ShopifyCollection, ShopifyCollectionProductsOperation } from '@/libs/shopify/types'
import { getMenuQuery } from '@/libs/shopify/queries/menu'
import { HIDDEN_PRODUCT_TAG, TAGS } from '@/libs/constants'
import { isShopifyError } from '@/libs/type-guards'
import { ensureStartsWith } from '@/libs/utils'
import { getProductsQuery } from '@/libs/shopify/queries/products'
import { getCollectionProductsQuery, getCollectionsQuery } from '@/libs/shopify/queries/collection'

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never

// Validate environment variables and get configuration
function getShopifyConfig() {
  if (!process.env.SHOPIFY_STORE_DOMAIN) {
    throw new Error('SHOPIFY_STORE_DOMAIN environment variable is not defined');
  }
  if (!process.env.SHOPIFY_API_VERSION) {
    throw new Error('SHOPIFY_API_VERSION environment variable is not defined');
  }
  if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is not defined');
  }

  const domain = ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://');
  const api_version = process.env.SHOPIFY_API_VERSION;
  const endpoint = `${domain}/api/${api_version}/graphql.json`;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  return { domain, api_version, endpoint, key };
}

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache
  headers?: HeadersInit
  query: string
  tags?: string[]
  variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T } | never> {
  const { endpoint, key } = getShopifyConfig();

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    })

    const body = await result.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return { status: result.status, body }
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || 'unknown',
        status: error.status || 500,
        message: error.message || 'An unknown error occurred',
        query,
      }
    }

    throw {
      error,
      query,
    }
  }
}

function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
  return array.edges.map(edge => edge?.node);
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
  const flatened = removeEdgesAndNodes(images)

  return flatened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1]

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    }
  })
}

function reshapeProduct(product: ShopifyProduct, filterHiddenProduct: boolean = true) {
  if (!product || (filterHiddenProduct && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined
  }

  const { images, variants, ...rest } = product

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  }
}

function reshapeProducts(products: ShopifyProduct[]) {
  const reshapedProducts = []

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product)

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct)
      }
    }
  }

  return reshapedProducts
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const { domain } = getShopifyConfig();

  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: { handle },
  })

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, '')
        // .replace('/collections', '/search')
        .replace('pages/', ''),
    })) || []
    // })) ?? [];
  )
}

export async function getProducts({
  query, reverse, sortKey
}: {
  query?: string
  reverse?: boolean
  sortKey?: string
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: { query, reverse, sortKey },
  })

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

function reshapeCollection(collection: ShopifyCollection): Collection | undefined {
  if (!collection) return undefined

  return {
    ...collection,
    path: `/search/${collection.handle}`
  }
}

function reshapeCollections(collections: ShopifyCollection[]): Collection[] {
  const reshapedCollections = []

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection)

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection)
      }
    }
  }

  return reshapedCollections
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  })

  const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections)
  const allCollection = {
    handle: '',
    title: 'All',
    description: 'All products',
    seo: {
      title: 'All products',
      description: 'All products',
    },
    path: '/search',
    updatedAt: new Date().toISOString(),
  }

  // Filter out hidden collections and add the "All" collection at the beginning
  const filteredCollections = reshapeCollections(shopifyCollections).filter(
    collection => !collection.handle.startsWith('hidden')
  )

  const collections = [allCollection, ...filteredCollections]

  return collections;
}

export async function getCollectionProducts({
  collection,
  sortKey,
  reverse,
  query,
}: {
  collection: string
  sortKey?: string
  reverse?: boolean
  query?: string
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: { handle: collection, sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey, reverse },
  })

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``)
    return []
  }

  let products = reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));

  // Client-side filtering if query is provided
  if (query && query.trim()) {
    const searchTerm = query.trim().toLowerCase()
    products = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  return products;
}
