'use client'

import {usePathname, useSearchParams} from 'next/navigation'
import Link from 'next/link'
import type {SortFilterItem} from '@/libs/constants'
import {createUrl} from '@/libs/utils'
import clsx from 'clsx'

export type PathFilterItem = {
  title: string
  path: string
}

export type ListItem = SortFilterItem | PathFilterItem

function PathFilterItem({item}: {item: PathFilterItem}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === item.path
  const newParams = new URLSearchParams(searchParams.toString())
  const DynamicTag = active ? 'p' : Link

  newParams.delete('q')

  return (
    <li className="mb-2 flex" key={item.title} id="FilterItem">
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={createUrl(item.path, newParams)}
        className={clsx('w-full text-sm underline-offset-4 hover:underline', {
          'underline underline-offset-4': active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

function SortFilterItem({item}: {item: SortFilterItem}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('sort') === item.slug
  const q = searchParams.get('q')
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && {q}),
      ...(item.slug && item.slug.length && {sort: item.slug}),
    }),
  )
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="mb-2 flex" key={item.title} id="FilterItem">
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx('w-full text-sm underline-offset-4 hover:underline', {
          'underline underline-offset-4': active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  )
}

export default function FilterItem({item}: {item: ListItem}) {
  return 'path' in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  )
}
