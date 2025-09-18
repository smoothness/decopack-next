'use client'

import Image from 'next/image'
import clsx from 'clsx'

import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {Button} from '@/components/ui/button'

type CardProps = {
  avatar: string
  name: string
  position?: string
  company: string
  text: boolean
  gray?: boolean
}

export function CardC({
  avatar,
  name,
  position,
  company,
  text,
  gray,
}: CardProps) {
  return (
    <Card
      className={clsx(
        'basis-[500px] border border-gray-50 bg-white',
        gray && 'bg-gray-25 border-0',
      )}
    >
      <CardContent>
        <div className="">
          <div className="mb-2 flex gap-4">
            <Image
              src={avatar}
              alt={name}
              width={70}
              height={70}
              className="mb-4 rounded-full"
            />
            <div>
              <p className="text-[18px] font-semibold">{name}</p>
              {position && <p className="text-sm">{position}</p>}
              <p className="text-md font-semibold">{company}</p>
            </div>
          </div>
          <p className="text-sm">{text}</p>
        </div>
      </CardContent>
    </Card>
  )
}
