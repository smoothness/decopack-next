'use client'

import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import {XCircleIcon} from '@phosphor-icons/react'
import {createUrl} from '@/libs/utils'

export function ResetSearchButton() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('q')

    router.push(createUrl(pathname, newParams))
  }

  return (
    <button
      onClick={handleReset}
      className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
      aria-label="Clear search"
    >
      <XCircleIcon size={16} weight="regular" />
      Clear search
    </button>
  )
}
