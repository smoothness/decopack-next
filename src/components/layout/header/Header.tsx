import Link from 'next/link'

import {Menu} from '@/lib/shopify/types'

import DecopackLogo from '@/components/svgs/DecopackLogo'
import {Navbar} from '@/components/layout/header/Navbar'

export function Header({menuPromise}: {menuPromise: Promise<Menu[]>}) {
  return (
    <header
    // className={`relative ${!activeDropdown && 'border-b border-gray-50 shadow-xs'}`}
    >
      {' '}
      <div className="m-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5">
        {/* Left side */}
        <div className="flex items-center">
          <Link href="/">
            <DecopackLogo />
          </Link>
        </div>
        {/* center side */}
        {/* Main nav */}
        <Navbar menuPromise={menuPromise} />
      </div>
    </header>
  )
}
