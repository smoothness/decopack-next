import clsx from 'clsx'

type PanelProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  gray?: boolean
}

export function Panel({title, subtitle, children, gray}: PanelProps) {
  return (
    <div className={clsx(gray && 'bg-gray-25')}>
      <div className="m-auto max-w-[1440px] px-10 py-25">
        <h2 className="mb-20 text-[clamp(2rem,3vw,4rem)] capitalize">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
