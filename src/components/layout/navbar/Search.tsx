'use client'

import {useId} from 'react'
import {useRouter, useSearchParams, usePathname} from 'next/navigation'
import {ArrowRightIcon, MagnifyingGlassIcon} from '@phosphor-icons/react'

import {createUrl} from '@/libs/utils'

import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const id = useId()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value.trim())
    } else {
      newParams.delete('q')
    }

    // Check if we're on a collection page and keep the search within that collection
    const isCollectionPage =
      pathname.startsWith('/search/') && pathname !== '/search'
    const redirectPath = isCollectionPage ? pathname : '/search'

    router.push(createUrl(redirectPath, newParams))
  }

  return (
    <form onSubmit={handleSubmit} className="*:not-first:mt-2">
      <Label htmlFor={id}>Search input with icon and button</Label>
      <div className="relative">
        <Input
          key={searchParams.get('q') || ''}
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Buscar productos..."
          name="search"
          type="search"
          autoComplete="off"
          defaultValue={searchParams.get('q') || ''}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <MagnifyingGlassIcon size={20} color="#262626" weight="regular" />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={24} color="#262626" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}

// function SearchSkeleton() {
//   return <div>SearchSkeleton</div>
// }
