import {defaultSort, sorting} from '@/libs/constants'
import {getProducts} from '@/libs/shopify'
import {Grid} from '@/app/search/components/Grid'
import {ProductGridItems} from '@/app/search/components/ProductGridItems'

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{[key: string]: string | string[] | undefined}>
}) {
  const resolvedSearchParams = await searchParams
  const {sort, q: searchValue} = resolvedSearchParams as {[key: string]: string}
  const {sortKey, reverse} =
    sorting.find((item) => item.slug === sort) || defaultSort
  const products = await getProducts({sortKey, reverse, query: searchValue})
  const resultText = products.length > 1 ? 'results' : 'result'

  return (
    <>
      {searchValue ? (
        <p>
          {products.length === 0
            ? 'There are no products that match your search.'
            : `Showing ${products.length} ${resultText} for`}
          <span>&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  )
}
