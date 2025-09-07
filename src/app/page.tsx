import {Hero} from '@/components/hero/Hero'
import {Panel} from '@/components/panel/Panel'
import {CardA} from '@/components/home/CardA'
import {CardB} from '@/components/home/CardB'
// import ClientsSlider from '@/components/clients-slider/clients-slider'

export const metadata = {
  description:
    'High-performance e-commerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
}

const fakeCards1 = [
  {
    title: 'Empaque para Producto',
    text: 'La oferta es diversa, abarcando desde cajas de cartón corrugado y cajas especializadas para comida rápida, panadería y repostería.',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Ver Colección',
  },
  {
    title: 'Empaque Personalizado',
    text: 'La oferta es diversa, abarcando desde cajas de cartón corrugado y cajas especializadas para comida rápida, panadería y repostería.',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Ver Colección',
  },
  {
    title: 'Empaque de Regalo',
    text: 'La oferta es diversa, abarcando desde cajas de cartón corrugado y cajas especializadas para comida rápida, panadería y repostería.',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Ver Colección',
  },
  {
    title: 'Empaque de Regalo',
    text: 'La oferta es diversa, abarcando desde cajas de cartón corrugado y cajas especializadas para comida rápida, panadería y repostería.',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Ver Colección',
  },
]

const fakeCards2 = [
  {
    title: 'Casa Dominga',
    text1: 'Bolsa de papel / B4',
    text2: 'Impresión litográfica',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Diseña tu Empaque',
  },
  {
    title: 'Icon',
    text1: 'Bolsa de papel / B4',
    text2: 'Impresión litográfica',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Diseña tu Empaque',
  },
  {
    title: 'Land Rover',
    text1: 'Bolsa de papel / B4',
    text2: 'Impresión litográfica',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Diseña tu Empaque',
  },
  {
    title: 'Tosty',
    text1: 'Bolsa de papel / B4',
    text2: 'Impresión litográfica',
    image: '/placeholders/placeholder-1.png',
    buttonText: 'Diseña tu Empaque',
  },
]

export default function Home() {
  return (
    <div>
      <div className="m-auto max-w-[1440px] px-10">
        <Hero />
      </div>
      {/* <ClientsSlider /> */}
      <Panel title="Variedad Para Cada Necesidad" gray>
        <div className="flex flex-wrap justify-center gap-5 lg:flex-nowrap">
          {fakeCards1?.map((card, index) => (
            <CardA
              key={index}
              title={card.title}
              text={card.text}
              image={card.image}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </Panel>
      <Panel title="Socios de empaque de tus marcas favoritas">
        <div className="flex flex-wrap justify-center gap-5 lg:flex-nowrap">
          {fakeCards2?.map((card, index) => (
            <CardB
              key={index}
              title={card.title}
              text1={card.text1}
              text2={card.text2}
              image={card.image}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </Panel>
    </div>
  )
}
