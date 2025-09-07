import {ShoppingCartIcon} from '@phosphor-icons/react'
import clsx from 'clsx'

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string
  quantity?: number
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md transition-colors">
      <ShoppingCartIcon
        color="#262626"
        weight="regular"
        className={clsx(
          'size-5 transition-all ease-in-out hover:scale-110',
          className,
        )}
      />
      {quantity ? (
        <div className="bg-accent absolute top-0 right-0 -mt-2 -mr-2 h-4 w-4 rounded text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  )
}
