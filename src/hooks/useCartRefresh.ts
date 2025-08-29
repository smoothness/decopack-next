'use client'

import { useCallback, useEffect, useState } from 'react'
import { getCookie } from '@/lib/utils/cookies'
import { getCartAction } from '@/lib/actions/cart-actions'
import { Cart } from '@/lib/shopify/types'

let refreshCounter = 0
const refreshListeners = new Set<() => void>()

export function triggerCartRefresh() {
  refreshCounter++
  refreshListeners.forEach(listener => listener())
}

export function useCartRefresh() {
  const [counter, setCounter] = useState(refreshCounter)
  
  useEffect(() => {
    const listener = () => setCounter(refreshCounter)
    refreshListeners.add(listener)
    return () => refreshListeners.delete(listener)
  }, [])
  
  const refreshCart = useCallback(() => {
    triggerCartRefresh()
  }, [])
  
  return refreshCart
}

export function useCartData(): Promise<Cart | undefined> {
  const [counter, setCounter] = useState(refreshCounter)
  const [cartPromise, setCartPromise] = useState<Promise<Cart | undefined>>(() => 
    Promise.resolve(undefined)
  )
  
  useEffect(() => {
    const listener = () => setCounter(refreshCounter)
    refreshListeners.add(listener)
    return () => refreshListeners.delete(listener)
  }, [])
  
  useEffect(() => {
    const cartId = getCookie('cartId')
    if (cartId) {
      // Pre-fetch the cart data, then update the promise with resolved data
      // This prevents the flash of loading state
      getCartAction(cartId).then(cart => {
        setCartPromise(Promise.resolve(cart))
      })
    } else {
      setCartPromise(Promise.resolve(undefined))
    }
  }, [counter])
  
  return cartPromise
}
