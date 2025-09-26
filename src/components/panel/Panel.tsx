import clsx from 'clsx'

type PanelProps = {
  title?: string
  subtitle?: string
  children: React.ReactNode
  gray?: boolean
  RightCTA?: React.JSXElementConstructor<any>
}

export function Panel({title, subtitle, children, gray, RightCTA}: PanelProps) {
  return (
    <div className={clsx('panel', gray && 'bg-gray-25')}>
      <div className="m-auto max-w-[1440px] px-10 py-25">
        <div className='flex justify-between'>
          {title && <h2 className="mb-20 capitalize">{title}</h2>}
          {RightCTA && <RightCTA />}
        </div>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
