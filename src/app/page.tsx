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
      <h1 className="text-3xl">DECOPACK</h1>
      <div className="flex w-full flex-col gap-2 text-nowrap md:flex-row">
        <Link
          href="/search"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Todos los Productos
        </Link>
        <Link
          href="/search/bolsas-corrugado"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Bolsas Corrugado
        </Link>
        <Link
          href="/search/bolsas-papel"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Bolsas Papel
        </Link>
        <Link
          href="/search/cajas-corrugado"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Cajas Corrugado
        </Link>
      </div>
    </div>
  )
}
