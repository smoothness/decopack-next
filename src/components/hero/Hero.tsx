import Image from 'next/image'
import Link from 'next/link'
import {ArrowRightIcon} from '@phosphor-icons/react/ssr'

// import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

interface HeroProps {
  badge?: string
  heading?: string
  description?: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
  image?: {
    src: string
    alt: string
  }
}

export const Hero = ({
  // badge = '✨ Your Website Builder',
  // heading = 'Tu Marca,\nNuestro Empaque',
  description = 'Refuerza tu imagen de marca y deleita a tus clientes con empaques que hablan por ti.',
  buttons = {
    primary: {
      text: 'Ver Todos los Productos',
      url: '/search',
    },
    secondary: {
      text: 'Diseña tu Empaque',
      url: '/',
    },
  },
  image = {
    src: '/home/decopack-bolsas-personalizadas.png',
    alt: 'Hero section demo image showing interface components',
  },
}: HeroProps) => {
  return (
    <section className="py-32">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col lg:items-start lg:text-left">
          {/* {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowRightIcon size={20} color="#262626" weight="regular" />
              </Badge>
            )} */}
          <h1 className="mb-4">
            Tu Marca
            <span className="block text-[clamp(3rem,6vw,5rem)]">
              Nuestro Empaque
            </span>
          </h1>
          <p className="mb-7 max-w-[75vw] text-[clamp(20px,3vw,28px)] leading-6 md:leading-8">
            {description}
          </p>
          <div className="flex flex-col justify-start gap-2 sm:flex-row">
            {buttons.primary && (
              <Button asChild size="xl" className="w-fit">
                <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
              </Button>
            )}
            {buttons.secondary && (
              <Button
                asChild
                size="xl"
                variant="outlineReverse"
                className="w-fit"
              >
                <Link href={buttons.secondary.url} className="group">
                  {buttons.secondary.text}
                  <ArrowRightIcon
                    size={20}
                    className="text-primary group-hover:text-accent transition-colors"
                    weight="regular"
                  />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div>
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="max-h-96 w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
