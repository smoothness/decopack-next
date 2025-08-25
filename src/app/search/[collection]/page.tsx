import {defaultSort, sorting} from '@/libs/constants'
import {Grid} from '@/app/search/components/Grid'
import {ProductGridItems} from '@/app/search/components/ProductGridItems'
import {getCollectionProducts} from '@/libs/shopify'
import {ResetSearchButton} from '@/app/search/components/ResetSearchButton'

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{collection: string}>
  searchParams?: Promise<{[key: string]: string | string[] | undefined}>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const {sort, q: searchQuery} = resolvedSearchParams as {[key: string]: string}
  const {sortKey, reverse} =
    sorting.find((item) => item.slug === sort) || defaultSort
  const products = await getCollectionProducts({
    collection: resolvedParams.collection,
    sortKey,
    reverse,
    query: searchQuery,
  })
  return (
    <section>
      {searchQuery ? (
        <div className="flex items-center justify-between py-3">
          <p>
            {products.length === 0
              ? `No products found for "${searchQuery}" in this collection.`
              : `Showing ${products.length} product${products.length === 1 ? '' : 's'} for "${searchQuery}" in this collection.`}
          </p>
          <ResetSearchButton />
        </div>
      ) : null}
      {products.length === 0 && !searchQuery ? (
        <p className="py-3">No products found in this collection.</p>
      ) : products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </section>
  )
}
