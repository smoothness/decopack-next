'use client'

import {Suspense, useEffect, useState} from 'react'
import CookieConsent from 'react-cookie-consent'
import {motion} from 'framer-motion'

import {trackingConfig} from '@/lib/tracking/config.tracking'
import {grantConsentForEverything} from '@/lib/tracking/utils.tracking'
import {Menu} from '@/lib/shopify/types'
import {getCookie} from '@/lib/utils/cookies'

import Navbar from '@/components/layout/navbar/Navbar'
import Footer from '@/components/layout/footer/Footer'
import {CartProvider} from '../cart/cart-context'
import {getCart} from '@/lib/shopify'
// TODO: refactor to use Anime.js instead of Framer Motion

export function RootInnerLayout({
  children,
  menuPromise,
  aboutMenuPromise,
}: {
  children: React.ReactNode
  menuPromise: Promise<Menu[]>
  aboutMenuPromise: Promise<Menu[]>
}) {
  // Initialize with a Promise that resolves to undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cartPromise, setCartPromise] = useState<Promise<any>>(() =>
    Promise.resolve(undefined),
  )

  useEffect(() => {
    // Only access cookies after hydration
    const cartId = getCookie('cartId')
    if (cartId) {
      setCartPromise(getCart(cartId))
    } else {
      setCartPromise(Promise.resolve(undefined))
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <CartProvider cartPromise={cartPromise}>
        <Suspense
          fallback={
            <div className="h-20 w-full">Cargado menú principal...</div>
          }
        >
          <Navbar menuPromise={menuPromise} />
        </Suspense>
        <main className="relative w-full flex-1 py-40">{children}</main>
        <Suspense
          fallback={
            <div className="h-20 w-full">Cargado menú sobre nosotros...</div>
          }
        >
          <Footer aboutMenuPromise={aboutMenuPromise} />
        </Suspense>
      </CartProvider>
      {/* Cookie Consent Banner */}
      <motion.div
        initial={{y: '100vh', opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 1, ease: 'easeInOut'}}
        className="fixed inset-x-0 bottom-0 z-50"
      >
        <CookieConsent
          disableStyles={true}
          cookieName={trackingConfig.cookieBannerCookieName}
          buttonText="Acknowledge"
          onAccept={grantConsentForEverything}
          location="bottom"
          containerClasses="w-full px-6 py-4 bg-black text-white text-center flex justify-center items-center flex-wrap shadow gap-3 md:gap-8 rounded-t-4xl shadow"
          buttonClasses="px-8 py-1.5 text-lg inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition bg-white text-black hover:bg-white/90 transition-colors ease-in-out duration-100"
        >
          <p>This website uses cookies to enhance the user experience.</p>
        </CookieConsent>
      </motion.div>
    </div>
  )
}
