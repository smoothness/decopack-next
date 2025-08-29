'use client'

import {useActionState} from 'react'
import {XCircleIcon} from '@phosphor-icons/react'

import {CartItem} from '@/lib/shopify/types'
import {removeItem} from '@/components/cart/actions'

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optimisticUpdate: any
}) {
  const [message, formAction] = useActionState(removeItem, null)
  const merchandiseId = item.merchandise.id
  const actionWithVariant = formAction.bind(null, merchandiseId)

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, 'delete')
        await actionWithVariant()
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XCircleIcon size={16} weight="regular" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
