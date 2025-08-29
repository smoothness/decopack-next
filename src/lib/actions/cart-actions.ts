'use server'

import { getCart } from '@/lib/shopify'
import { Cart } from '@/lib/shopify/types'

export async function getCartAction(cartId: string): Promise<Cart | undefined> {
  try {
    return await getCart(cartId)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return undefined
  }
}
