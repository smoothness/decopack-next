import Link from 'next/link'

export const metadata = {
  description:
    'High-performance e-commerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="m-auto max-w-[1440px] px-5">
      <h1 className="text-3xl">Hello world!</h1>

      <div className="flex w-full flex-col gap-2 text-nowrap md:flex-row">
        <Link
          href="/search/womens-collection"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Shop Women
        </Link>
        <Link
          href="/search/mens-collection"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Shop Men
        </Link>
        <Link
          href="/search/sales"
          className="border-input bg-background hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border border-red-300 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-red-300 focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Shop Sales
        </Link>
      </div>
    </div>
  )
}
