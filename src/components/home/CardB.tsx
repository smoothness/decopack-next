'use client'

import Image from 'next/image'
import clsx from 'clsx'

import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'

type CardProps = {
  title: string
  text1: string
  text2: string
  image: string
  buttonText?: string
  gray?: boolean
}

export function CardB({
  title,
  text1,
  text2,
  image,
  buttonText,
  gray,
}: CardProps) {
  return (
    <Card
      className={clsx(
        'shadow-card relative z-0 basis-[400px] gap-3 border border-gray-50 bg-white',
        gray && 'bg-gray-25 border-0',
      )}
    >
      <CardContent className="flex flex-col items-center justify-center text-center">
        <Image src={image} alt="Quality Products" width={280} height={280} />
        <p className="text-md mb-4 text-center font-semibold text-black">
          {title}
        </p>
        <p className="mb-0 text-center text-sm">{text1}</p>
        <p className="mb-6 text-center text-sm">{text2}</p>
        <Button size="sm">{buttonText}</Button>
      </CardContent>
    </Card>
  )
}
