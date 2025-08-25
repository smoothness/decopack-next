import {Suspense} from 'react'
import clsx from 'clsx'

import {getCollections} from '@/libs/shopify'
import {FilterList} from '@/app/search/components/FilterList'

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800'
const items = 'bg-neutral-400'

async function CollectionList() {
  const collections = await getCollections()

  return <FilterList list={collections} title="Collections" />
}

export function Collections() {
  return (
    <Suspense
      fallback={
        <div
          id="Collections"
          className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block"
        >
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  )
}
