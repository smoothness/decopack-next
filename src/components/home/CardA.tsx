import Image from 'next/image'
import clsx from 'clsx'

import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {Button} from '@/components/ui/button'

type PanelProps = {
  title: string
  text: string
  image: string
  buttonText?: string
  gray?: boolean
}

export function CardA({title, text, image, buttonText, gray}: PanelProps) {
  return (
    <Card
      className={clsx(
        'basis-[400px] gap-3 border border-gray-50 bg-white',
        gray && 'bg-gray-25 border-0',
      )}
    >
      <CardHeader>
        <h3 className="text-center text-lg text-gray-800">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm">{text}</p>
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src={image}
            alt="Quality Products"
            width={280}
            height={280}
            className="mb-4 rounded-lg"
          />
          <Button size="sm">{buttonText}</Button>
        </div>
      </CardContent>
    </Card>
  )
}
