import { Button } from '@radix-ui/themes'
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
    <div className="relative flex max-w-80 w-60 min-h-fit flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="p-4">
        <h5 className="mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {logo}
          <span>{title}</span>
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">{description}</p>
      </div>
      <div className="p-4 pt-0">
        <Link href={to}>
          <Button color="pink" size="1" variant="soft">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  )
}
