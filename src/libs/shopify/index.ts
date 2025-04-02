import { Menu, ShopifyMenuOperation } from '@/libs/shopify/types'
import { getMenuQuery } from '@/libs/shopify/queries/menu'
import { TAGS } from '@/libs/constants'
import { isShopifyError } from '@/libs/type-guards'
import { ensureStartWith } from '@/libs/utils'

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never

// Check if environment variables are defined
if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw new Error('SHOPIFY_STORE_DOMAIN environment variable is not defined');
}
if (!process.env.SHOPIFY_API_VERSION) {
  throw new Error('SHOPIFY_API_VERSION environment variable is not defined');
}
if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is not defined');
}

const domain = ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://');
const api_version = process.env.SHOPIFY_API_VERSION;
const endpoint = `${domain}/api/${api_version}/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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

export async function getMenu(handle: string): Promise<Menu[]> {
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
        .replace('/collections', '/search')
        .replace('pages', ''),
    })) || []
    // })) ?? [];
  )
}
