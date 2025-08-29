'use client'

import {ArrowRightIcon} from '@phosphor-icons/react'

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

const Hero = ({
  // badge = '✨ Your Website Builder',
  heading = 'Tu Marca, Nuestro Empaque',
  description = 'Refuerza tu imagen de marca y deleita a tus clientes con empaques que hablan por ti.',
  buttons = {
    primary: {
      text: 'Discover all components',
      url: 'https://www.shadcnblocks.com',
    },
    secondary: {
      text: 'View on GitHub',
      url: 'https://www.shadcnblocks.com',
    },
  },
  image = {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
    alt: 'Hero section demo image showing interface components',
  },
}: HeroProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRightIcon
                      size={20}
                      color="#262626"
                      weight="regular"
                    />
              </Badge>
            )} */}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRightIcon
                      size={20}
                      color="#262626"
                      weight="regular"
                    />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
