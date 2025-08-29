'use client'

import {useActionState} from 'react'
import {PlusIcon, MinusIcon} from '@phosphor-icons/react'
import clsx from 'clsx'

import {CartItem} from '@/lib/shopify/types'
import {updateItemQuantity} from '@/components/cart/actions'

function SubmitButton({type}: {type: 'plus' | 'minus'}) {
  return (
    <button
      type="submit"
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={clsx(
        'ease flex h-full max-w-[36px] min-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus',
        },
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  )
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem
  type: 'plus' | 'minus'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optimisticUpdate: any
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null)
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1,
  }
  const actionWithVariant = formAction.bind(null, payload)
  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type)
        await actionWithVariant()
      }}
    >
      <SubmitButton type={type} />
      <p aria-label="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  )
}
