// import Image from 'next/image'
import {use, useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import {
  CaretDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from '@phosphor-icons/react'

import {cn} from '@/libs/utils'
import {Menu, SubMenu} from '@/libs/shopify/types'

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
import Search from '@/components/layout/navbar/Search'

const linkClasses = cn(
  `data-[active]:focus:bg-gray-100 data-[active]:hover:text-accent data-[active]:bg-gray-100 data-[active]:text-primary-700 hover:text-accent focus:bg-gray-100 focus:text-primary-700 focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 after:ease-in-out hover:after:w-full focus:after:w-full`,
)

export default function Navbar({menuPromise}: {menuPromise: Promise<Menu[]>}) {
  const menu = use(menuPromise)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
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

  function handleSearchToggle() {
    if (isSearchOpen) {
      setIsDropdownOpen(false)
      setIsSearchOpen(false)
      setActiveDropdown(null)
      return
    }
    setIsDropdownOpen(true)
    setIsSearchOpen(true)
    setActiveDropdown(null)
  }

  console.log('%c menu:', 'color:black; background:magenta;', menu)

  return (
    <header
      className={`relative ${!activeDropdown && 'border-b border-gray-50 shadow-xs'}`}
    >
      <div className="m-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5">
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
                {menu.map((item: Menu, index: number) => (
                  <NavigationMenuItem key={item.title}>
                    {item.submenu ? (
                      <>
                        <Link
                          href={item.path || '#'}
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
                          <span>{item.title}</span>
                          <CaretDownIcon
                            size={16}
                            color="#262626"
                            weight="thin"
                          />
                        </Link>
                      </>
                    ) : (
                      <Link href={item.path || '#'} className={linkClasses}>
                        {item.title}
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
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleSearchToggle()
            }}
            className="pointer-events-auto cursor-pointer shadow-none"
          >
            <MagnifyingGlassIcon size={20} color="#262626" weight="regular" />
          </Button>
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
                {menu.map((item: Menu) => (
                  <NavigationMenuItem key={item.title} className="w-full">
                    {item.submenu ? (
                      <>
                        <div>{item.title}</div>
                        <ul>
                          {(item.submenu ?? []).map((subItem: SubMenu) => (
                            <li key={subItem.title}>
                              <Link href={subItem.path} className={linkClasses}>
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link href={item.path || '#'} className={linkClasses}>
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </PopoverContent>
        </Popover>
      </div>

      {/* Full-width dropdown menu */}
      {activeDropdown !== null &&
        (menu[activeDropdown]?.submenu?.length ?? 0) > 0 && (
          <div
            className={`absolute top-full right-0 left-0 z-50 origin-top transform border-b border-gray-50 bg-white shadow-xs transition-all duration-300 ease-in-out ${
              isDropdownOpen
                ? 'translate-y-0 scale-y-100 opacity-100'
                : 'pointer-events-none -translate-y-2 scale-y-95 opacity-0'
            }`}
            onMouseEnter={() => handleMouseEnter(activeDropdown, true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mx-auto max-w-[1440px] px-5 py-8">
              {menu[activeDropdown] && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {menu[activeDropdown]?.submenu?.map((item: SubMenu) => (
                    <Link
                      key={item.title}
                      href={item.path || '#'}
                      className="block rounded-lg p-4 text-center transition-colors hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      {/* Full-width search bar*/}
      <div
        className={`absolute top-full right-0 left-0 z-50 origin-top transform border-b border-gray-50 bg-white shadow-xs transition-all duration-300 ease-in-out ${
          isSearchOpen
            ? 'translate-y-0 scale-y-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-y-95 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-5 py-8">
          <Search />
        </div>
      </div>
    </header>
  )
}
