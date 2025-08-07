'use client'

import {useState} from 'react'
import Link from 'next/link'

import {Menu} from '@/libs/shopify/types'

export default function MobileMenu({menu}: {menu: Menu[]}) {
  const [isOpen, setIsOpen] = useState(false)

  function openMobileMenu() {
    setIsOpen(true)
  }

  function closeMobileMenu() {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={openMobileMenu} aria-label="Open mobile menu">
        Open
      </button>
      <div className={`z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <button onClick={closeMobileMenu}>x</button>
        {menu.length > 0 && (
          <ul>
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link href={item.path} prefetch onClick={closeMobileMenu}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
