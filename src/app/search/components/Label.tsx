import Price from '@/components/common/Price'
import clsx from 'clsx'

export function Label({
  title,
  amount,
  currencyCode,
  position = 'bottom',
}: {
  title: string
  amount: string
  currencyCode: string
  position?: 'bottom' | 'center'
}) {
  return (
    <div
      id="Label"
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4', {
        'lg:px-20 lg:pb-[35%]': position === 'center',
      })}
    >
      <h3>{title}</h3>
      <Price
        className="flex-none rounded-full bg-blue-600 text-white"
        amount={amount}
        currencyCode={currencyCode}
        currencyCodeClassName="hidden src[275px]/label:inline"
      />
    </div>
  )
}
