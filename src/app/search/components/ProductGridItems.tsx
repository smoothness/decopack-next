import Link from 'next/link'

import {Grid} from '@/app/search/components/Grid'
import {GridTileImage} from '@/app/search/components/GridTile'
import {Product} from '@/libs/shopify/types'

export function ProductGridItems({products}: {products: Product[]}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            href={`/product/${product.handle}`}
            className="w-fill relative h-full"
            prefetch
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  )
}
