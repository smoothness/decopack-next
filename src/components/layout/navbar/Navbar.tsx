// import Image from 'next/image'
import {use, useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import {BookOpenIcon, InfoIcon, LifeBuoyIcon} from 'lucide-react'
import {
  CaretDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from '@phosphor-icons/react'

import {cn} from '@/libs/utils'
import {Menu} from '@/libs/shopify/types'

import {Button} from '@/components/ui/button'
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import DecopackLogo from '@/components/svgs/DecopackLogo'

const linkClasses = cn(
  `data-[active]:focus:bg-gray-100 data-[active]:hover:text-accent data-[active]:bg-gray-100 data-[active]:text-primary-700 hover:text-accent focus:bg-gray-100 focus:text-primary-700 focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4`,
)

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  {href: '#', label: 'Home'},
  {
    label: 'Features',
    submenu: true,
    type: 'description',
    items: [
      {
        href: '#',
        label: 'Components',
        description: 'Browse all components in the library.',
      },
      {
        href: '#',
        label: 'Documentation',
        description: 'Learn how to use the library.',
      },
      {
        href: '#',
        label: 'Templates',
        description: 'Pre-built layouts for common use cases.',
      },
    ],
  },
  {
    label: 'Pricing',
    submenu: true,
    type: 'simple',
    items: [
      {href: '#', label: 'Product A'},
      {href: '#', label: 'Product B'},
      {href: '#', label: 'Product C'},
      {href: '#', label: 'Product D'},
    ],
  },
  {
    label: 'About',
    submenu: true,
    type: 'icon',
    items: [
      {href: '#', label: 'Getting Started', icon: 'BookOpenIcon'},
      {href: '#', label: 'Tutorials', icon: 'LifeBuoyIcon'},
      {href: '#', label: 'About Us', icon: 'InfoIcon'},
    ],
  },
]

export default function Navbar({menuPromise}: {menuPromise: Promise<Menu[]>}) {
  const menu = use(menuPromise)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = (index: number, hasSubmenu: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (hasSubmenu) {
      setActiveDropdown(index)
      setIsDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setIsDropdownOpen(false)
    }, 150) // Small delay to prevent flickering
  }

  const handleClick = (index: number, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      if (activeDropdown === index && isDropdownOpen) {
        setActiveDropdown(null)
        setIsDropdownOpen(false)
      } else {
        setActiveDropdown(index)
        setIsDropdownOpen(true)
      }
    }
  }

  console.log('%c menu:', 'color:black; background:magenta;', menu)
  return (
    <header className="relative border-b border-gray-50 px-4 md:px-6">
      <div className="m-auto flex h-16 max-w-[1440px] items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center">
          <Link href="/">
            <DecopackLogo />
          </Link>
        </div>
        {/* center side */}
        <div className="flex items-center gap-2" ref={dropdownRef}>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            {/* Navigation menu */}
            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    {link.submenu ? (
                      <>
                        <Link
                          href={link.href || '#'}
                          className={cn(
                            linkClasses,
                            `flex flex-row items-center`,
                          )}
                          onMouseEnter={() => handleMouseEnter(index, true)}
                          onMouseLeave={handleMouseLeave}
                          onClick={(e) => {
                            e.preventDefault()
                            handleClick(index, true)
                          }}
                        >
                          <span>{link.label}</span>
                          <CaretDownIcon
                            size={16}
                            color="#262626"
                            weight="thin"
                          />
                        </Link>
                      </>
                    ) : (
                      <Link href={link.href || '#'} className={linkClasses}>
                        {link.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link href={'#'}>
            <MagnifyingGlassIcon size={20} color="#262626" weight="regular" />
          </Link>
          <Link href={'#'}>
            <UserIcon size={20} color="#262626" weight="regular" />
          </Link>
          <Link href={'#'}>
            <ShoppingCartIcon size={20} color="#262626" weight="regular" />
          </Link>
        </div>
        {/* Mobile menu trigger */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="group size-8 md:hidden"
              variant="ghost"
              size="icon"
            >
              <svg
                className="pointer-events-none"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 p-1 md:hidden">
            <NavigationMenu className="max-w-none *:w-full">
              <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="w-full">
                    {link.submenu ? (
                      <>
                        <div>{link.label}</div>
                        <ul>
                          {link.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link href={item.href} className={linkClasses}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link href={link.href || '#'} className={linkClasses}>
                        {link.label}
                      </Link>
                    )}
                    {/* Add separator between different types of items */}
                    {index < navigationLinks.length - 1 &&
                      // Show separator if:
                      // 1. One is submenu and one is simple link OR
                      // 2. Both are submenus but with different types
                      ((!link.submenu && navigationLinks[index + 1].submenu) ||
                        (link.submenu && !navigationLinks[index + 1].submenu) ||
                        (link.submenu &&
                          navigationLinks[index + 1].submenu &&
                          link.type !== navigationLinks[index + 1].type)) && (
                        <div
                          role="separator"
                          aria-orientation="horizontal"
                          className="bg-border -mx-1 my-1 h-px w-full"
                        />
                      )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </PopoverContent>
        </Popover>
      </div>

      {/* Full-width dropdown menu */}
      {activeDropdown !== null && navigationLinks[activeDropdown]?.submenu && (
        <div
          className={`absolute top-full right-0 left-0 z-50 origin-top transform border-b border-gray-100 bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isDropdownOpen
              ? 'translate-y-0 scale-y-100 opacity-100'
              : 'pointer-events-none -translate-y-2 scale-y-95 opacity-0'
          }`}
          onMouseEnter={() => handleMouseEnter(activeDropdown, true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-6">
            {navigationLinks[activeDropdown]?.type === 'description' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {navigationLinks[activeDropdown]?.items.map(
                  (item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="block rounded-lg p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="mb-1 font-medium text-gray-900">
                        {item.label}
                      </div>
                      {'description' in item && (
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {item.description}
                        </p>
                      )}
                    </Link>
                  ),
                )}
              </div>
            )}

            {navigationLinks[activeDropdown]?.type === 'icon' && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {navigationLinks[activeDropdown]?.items.map(
                  (item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="flex items-center rounded-lg p-4 transition-colors hover:bg-gray-50"
                    >
                      {'icon' in item && (
                        <>
                          {item.icon === 'BookOpenIcon' && (
                            <BookOpenIcon
                              size={20}
                              className="mr-3 text-gray-600"
                              aria-hidden="true"
                            />
                          )}
                          {item.icon === 'LifeBuoyIcon' && (
                            <LifeBuoyIcon
                              size={20}
                              className="mr-3 text-gray-600"
                              aria-hidden="true"
                            />
                          )}
                          {item.icon === 'InfoIcon' && (
                            <InfoIcon
                              size={20}
                              className="mr-3 text-gray-600"
                              aria-hidden="true"
                            />
                          )}
                        </>
                      )}
                      <span className="font-medium text-gray-900">
                        {item.label}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            )}

            {navigationLinks[activeDropdown]?.type === 'simple' && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {navigationLinks[activeDropdown]?.items.map(
                  (item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="block rounded-lg p-4 text-center transition-colors hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">
                        {item.label}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
