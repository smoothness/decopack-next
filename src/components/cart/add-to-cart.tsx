'use client'

import {useActionState} from 'react'
import {PlusIcon} from '@phosphor-icons/react'
import clsx from 'clsx'

import {Product, ProductVariant} from '@/lib/shopify/types'

import {useCart} from '@/components/cart/cart-context'
import {useProduct} from '@/components/product/product-context'
import {addItem} from '@/components/cart/actions'

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out of Stock
      </button>
    )
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add to Cart
      </button>
    )
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  )
}

export function AddToCart({product}: {product: Product}) {
  const {variants, availableForSale} = product
  const {addCartItem} = useCart()
  const {state} = useProduct()
  const [message, formAction] = useActionState(addItem, null)
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  )
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const selectedVariantId = variant?.id || defaultVariantId
  const actionWithVariant = formAction.bind(null, selectedVariantId)
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!
  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product)
        await actionWithVariant()
        // Trigger cart refresh after server action completes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('cart-refresh'))
        }
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p className="sr-only" role="status" aria-label="polite">
        {message}
      </p>
    </form>
  )
}
