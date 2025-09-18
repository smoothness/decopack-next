import Image from 'next/image'

import {Hero} from '@/components/hero/Hero'
import {Panel} from '@/components/panel/Panel'
import {CardA} from '@/components/home/CardA'
import {CardB} from '@/components/home/CardB'
import {CardC} from '@/components/home/CardC'
import {Carousel} from '@/components/carousel/Carousel'
import {Button} from '@/components/ui/button'
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
]

const fakeCards3 = [
  {
    avatar: '/placeholders/avatar.png',
    name: 'Ricardo Visona',
    position: 'Fundador / Chef',
    company: 'Casa Dominga',
    text: '“Decopack ha sido un socio fundamental en el crecimiento de nuestro negocio. Su compromiso con la calidad y la innovación nos ha permitido ofrecer a nuestros clientes empaques que no solo protegen nuestros productos, sino que también reflejan la esencia de nuestra marca.”',
  },
  {
    avatar: '/placeholders/avatar.png',
    name: 'Ricardo Visona',
    position: 'Fundador / Chef',
    company: 'Casa Dominga',
    text: '“Decopack ha sido un socio fundamental en el crecimiento de nuestro negocio. Su compromiso con la calidad y la innovación nos ha permitido ofrecer a nuestros clientes empaques que no solo protegen nuestros productos, sino que también reflejan la esencia de nuestra marca.”',
  },
  {
    avatar: '/placeholders/avatar.png',
    name: 'Ricardo Visona',
    position: 'Fundador / Chef',
    company: 'Casa Dominga',
    text: '“Decopack ha sido un socio fundamental en el crecimiento de nuestro negocio. Su compromiso con la calidad y la innovación nos ha permitido ofrecer a nuestros clientes empaques que no solo protegen nuestros productos, sino que también reflejan la esencia de nuestra marca.”',
  },
  {
    avatar: '/placeholders/avatar.png',
    name: 'Ricardo Visona',
    position: 'Fundador / Chef',
    company: 'Casa Dominga',
    text: '“Decopack ha sido un socio fundamental en el crecimiento de nuestro negocio. Su compromiso con la calidad y la innovación nos ha permitido ofrecer a nuestros clientes empaques que no solo protegen nuestros productos, sino que también reflejan la esencia de nuestra marca.”',
  },
]

export default function Home() {
  return (
    <div>
      <div className="m-auto max-w-[1440px] px-10">
        <Hero />
      </div>
      <Panel title="Socios de empaque de tus marcas favoritas" gray>
        <div className="flex flex-wrap justify-center gap-5 lg:flex-nowrap">
          <Carousel
            data={fakeCards2}
            component={CardB}
            slidesPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
            }}
            showIndicators={true}
            showControls={true}
            infinite={true}
          />
        </div>
      </Panel>
      <Panel title="Variedad Para Cada Necesidad">
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
      <Panel title="Recientes" gray>
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
      <Panel>
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-10">
          <div>
            <Image
              src="/placeholders/placeholder-banner.png"
              alt="Placeholder"
              width={571}
              height={378}
              className="m-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 571px"
            />
          </div>
          <div>
            <h3 className="">Creamos empaques a tu medida</h3>
            <p className="mb-1 font-semibold">Cajas Casa Dominga</p>
            <p className="mb-8 text-sm">
              Personalización y diseño a medida para cada cliente.
            </p>
            <Button variant="default" size="lg">
              Diseña tu Empaque
            </Button>
          </div>
        </div>
      </Panel>
      <Panel title="Lo que dicen nuestros clientes" gray>
        <div className="flex flex-wrap justify-center gap-5 lg:flex-nowrap">
          <Carousel
            data={fakeCards3}
            component={CardC}
            slidesPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
            }}
            showIndicators={true}
            showControls={true}
            infinite={true}
          />
        </div>
      </Panel>
    </div>
  )
}
