import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
interface Props {
  description: React.ReactNode
  logo: React.ReactNode
  title: string
  to: string
}

export default function Entry({ title, logo, description, to }: Props) {
  return (
    <Card className="relative flex max-w-80 w-60 min-h-fit flex-col rounded-xl bg-clip-border shadow-md">
      <Link href={to}>
        <div className="p-4">
          <Text as="div" className="mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal antialiased">
            {logo}
            <Text as="span">{title}</Text>
          </Text>
          <Text as="p" className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {description}
          </Text>
        </div>
      </Link>
    </Card>
  )
}
