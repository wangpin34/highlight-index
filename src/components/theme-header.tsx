import { Cross2Icon } from '@radix-ui/react-icons'
import { Heading } from '@radix-ui/themes'
import Link from 'next/link'

export default function ThemeHeader({ title, backTo }: { title: string; backTo: string }) {
  return (
    <div className="w-screen h-16 fixed top-0 left-0 flex items-center shadow-sm">
      <div className="relative w-full h-full flex items-center">
        <div aria-label="left actions" className="px-6 z-10">
          <Link href={backTo}>
            <Cross2Icon width={24} height={24} color="gray" />
          </Link>
        </div>
        <Heading className="w-full h-full absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center text-slate-700">
          <span>{title}</span>
        </Heading>
      </div>
    </div>
  )
}
