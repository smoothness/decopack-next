import {Hero} from '@/components/hero/Hero'
import CardRow from '@/components/ui/card-row'
import ClientsSlider from '@/components/clients-slider/clients-slider'

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
      <Hero />
      <ClientsSlider />
      <CardRow />
    </div>
  )
}
