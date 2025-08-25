import {use} from 'react'
import Link from 'next/link'
import {InstagramLogoIcon, FacebookLogoIcon} from '@phosphor-icons/react'

import DecopackLogo from '@/components/svgs/DecopackLogo'
// import {getMenu} from '@/libs/shopify'
import {Menu} from '@/libs/shopify/types'

function Footer({aboutMenuPromise}: {aboutMenuPromise: Promise<Menu[]>}) {
  const aboutMenu = use(aboutMenuPromise)

  return (
    <footer
      className="border-t border-neutral-100 bg-neutral-50 pb-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        {/* Top Section */}
        <div className="flex flex-col justify-between lg:flex-row">
          {/* Quick Links */}
          <div className="flex gap-12 pb-10 lg:gap-25">
            <div>
              <h3 className="text-subtitle-sm mb-4">Sobre Nosotros</h3>
              <nav aria-label="Footer main navigation">
                {aboutMenu.length > 0 ? (
                  <ul className="space-y-3">
                    {aboutMenu.map((item: Menu) => (
                      <li key={item.title} className="mb-0">
                        <Link
                          href={item.path}
                          className="hover:text-accent focus:text-accent text-sm font-light transition-colors duration-200 focus:underline focus:outline-none"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </nav>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-subtitle-sm mb-4">Productos</h3>
              <nav aria-label="Footer product navigation">
                <ul className="space-y-3">
                  <li className="mb-0">
                    <Link
                      href="/products"
                      className="hover:text-accent focus:text-accent text-sm font-light transition-colors duration-200 focus:underline focus:outline-none"
                    >
                      Products
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:max-w-[30%]">
            <h3 className="text-subtitle-sm mb-4">Contáctenos</h3>
            <p className="text-body-sm mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit voluptatem deleniti exercitationem explicabo
              obcaecati? Est pariatur, enim perspiciatis, tempora reprehenderit
              aut ipsa magnam quae at veniam quas officia! Sapiente, magni.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-10 pb-4 lg:pb-0">
              {/* Logo and Company Info */}
              <div>
                <Link href="/" aria-label="Decopack - Go to homepage">
                  <DecopackLogo />
                </Link>
              </div>
              {/* Social Media Links */}
              <div className="flex items-center">
                <Link
                  href="https://instagram.com/decopack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="hover:text-accent focus:text-accent focus:ring-accent text-gray-00 rounded-full p-2 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <InstagramLogoIcon size={24} weight="thin" />
                </Link>
                <Link
                  href="https://facebook.com/decopack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="hover:text-accent focus:text-accent focus:ring-accent rounded-full p-2 text-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <FacebookLogoIcon size={24} weight="thin" />
                </Link>
              </div>
            </div>

            {/* Copyright and Legal */}
            <div>
              <p className="font-light text-gray-400">
                <small>© 2025 Decopack. Derechos reservados.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
