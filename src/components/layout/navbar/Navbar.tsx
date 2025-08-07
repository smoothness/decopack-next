import Image from 'next/image'
import Link from 'next/link'

import {getMenu} from '@/libs/shopify'
import {Menu} from '@/libs/shopify/types'
import MobileMenu from '@/components/layout/navbar/MobileMenu'

export async function Navbar() {
  const menu = await getMenu('main-menu')

  console.log('menu test', menu)

  return (
    <nav>
      <div>
        <Link href="/" prefetch>
          <Image
            src="/decopack-logo.svg"
            alt="Decopack Logo"
            width={120}
            height={40}
            priority
          />
        </Link>
      </div>
      <div className="block md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="hidden md:flex">
        {menu.length > 0 && (
          <ul>
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link href={item.path} prefetch>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <Search />
      <Cart /> */}
    </nav>
  )
}
