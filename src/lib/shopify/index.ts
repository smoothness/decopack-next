import { Connection, Menu, ShopifyMenuOperation, ShopifyProduct, ShopifyProductsOperation, Image, Product, Collection, ShopifyCollectionsOperation, ShopifyCollection, ShopifyCollectionProductsOperation, ShopifyProductOperation, ShopifyAddToCartOperation, Cart, ShopifyCart, ShopifyProductRecommendationsOperation, ShopifyCartOperation, ShopifyCreateCartOperation, ShopifyRemoveFromCartOperation, ShopifyUpdateCartOperation } from '@/lib/shopify/types'
import { getMenuQuery } from '@/lib/shopify/queries/menu'
import { HIDDEN_PRODUCT_TAG, TAGS } from '@/lib/constants'
import { isShopifyError } from '@/lib/type-guards'
import { ensureStartsWith } from '@/lib/utils'
import { getProductsQuery, getProductQuery, getProductRecommendationsQuery } from '@/lib/shopify/queries/product'
import { getCollectionProductsQuery, getCollectionsQuery } from '@/lib/shopify/queries/collection'
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from '@/lib/shopify/mutations/cart'
import { getCartQuery } from '@/lib/shopify/queries/cart'

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never

// Cache for configuration to avoid repeated validation
let shopifyConfigCache: { domain: string; api_version: string; endpoint: string; key: string } | null = null;

// Environment configuration with fallbacks
const ENV_CONFIG = {
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN || 'decopack-next.myshopify.com',
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION || '2025-01',
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'f85ea0b21006ee98a8f4715ba4d5db2c',
};

// Validate environment variables and get configuration
function getShopifyConfig() {
  // Return cached config if available
  if (shopifyConfigCache) {
    return shopifyConfigCache;
  }

  // Try to load from environment first, then fallbacks
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || ENV_CONFIG.SHOPIFY_STORE_DOMAIN;
  const apiVersion = process.env.SHOPIFY_API_VERSION || ENV_CONFIG.SHOPIFY_API_VERSION;
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || ENV_CONFIG.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Debug information for environment variables
  if (process.env.NODE_ENV === 'development') {
    console.log('Shopify environment check:', {
      usingFallbacks: !process.env.SHOPIFY_STORE_DOMAIN,
      hasStoreDomain: !!storeDomain,
      hasApiVersion: !!apiVersion,
      hasAccessToken: !!accessToken,
      NODE_ENV: process.env.NODE_ENV,
      // Show partial values for debugging (first few characters)
      storeDomainStart: storeDomain?.substring(0, 10) + '...',
      envKeys: Object.keys(process.env).filter(k => k.includes('SHOPIFY')),
    });
  }

  // Validate that we have the required values (either from env or fallbacks)
  if (!storeDomain) {
    throw new Error(
      'SHOPIFY_STORE_DOMAIN is required but not found in environment variables or fallbacks. ' +
      'Please check your .env.local file and ensure it contains: SHOPIFY_STORE_DOMAIN="your-store.myshopify.com". ' +
      `Current NODE_ENV: ${process.env.NODE_ENV || 'undefined'}. ` +
      `Available env keys: ${Object.keys(process.env).filter(k => k.includes('SHOPIFY')).join(', ')}`
    );
  }
  if (!apiVersion) {
    throw new Error(
      'SHOPIFY_API_VERSION is required but not found in environment variables or fallbacks. ' +
      'Please check your .env.local file and ensure it contains: SHOPIFY_API_VERSION="2025-01". ' +
      `Current NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`
    );
  }
  if (!accessToken) {
    throw new Error(
      'SHOPIFY_STOREFRONT_ACCESS_TOKEN is required but not found in environment variables or fallbacks. ' +
      'Please check your .env.local file and ensure it contains your Shopify Storefront Access Token. ' +
      `Current NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`
    );
  }

  const domain = ensureStartsWith(storeDomain, 'https://');
  const endpoint = `${domain}/api/${apiVersion}/graphql.json`;
  const key = accessToken;

  // Cache the configuration
  shopifyConfigCache = { domain, api_version: apiVersion, endpoint, key };

  if (process.env.NODE_ENV === 'development') {
    console.log('Shopify config initialized:', {
      domain,
      apiVersion,
      endpoint,
      hasKey: !!key,
    });
  }

  return shopifyConfigCache;
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
      submenu: null,
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

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: { handle },
  })

  return reshapeProduct(res.body.data.product, false);
}

function reshapeCart(cart: ShopifyCart): Cart {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(
  cartId: string | undefined
): Promise<Cart | undefined> {
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  });

  // old carts becomes 'null' when you checkout
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-cache",
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}