import {getMenu} from '@/libs/shopify'

export async function Navbar() {
  const menu = await getMenu('main-menu')

  console.log('menu', menu)

  return <nav>Navbar</nav>
}
