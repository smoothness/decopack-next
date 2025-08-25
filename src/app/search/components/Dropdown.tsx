'use client'

import {useEffect, useRef, useState} from 'react'
import {usePathname, useSearchParams} from 'next/navigation'
import FilterItem, {ListItem} from '@/app/search/components/FilterItem'

export default function FilterItemDropdown({list}: {list: ListItem[]}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState('')
  const [openSelect, setOpenSelect] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        setActive(listItem.title)
      }
    })
  }, [list, pathname, searchParams])

  return (
    <div ref={ref} id="Dropdown">
      <div
        onClick={() => setOpenSelect(!openSelect)}
        className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm"
      >
        {active}
      </div>
      {openSelect && (
        <div
          onClick={() => setOpenSelect(false)}
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem item={item} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
