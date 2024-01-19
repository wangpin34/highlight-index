import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import Link from 'next/link'
import React, { useCallback } from 'react'

interface Props {
  query: string
  onChange: (query: string) => void
}

export default function TopSearch({ query, onChange }: Props) {
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.value)
    },
    [onChange]
  )
  return (
    <div className="w-screen h-16 px-6 fixed top-0 left-0 flex items-center gap-4 shadow-sm bg-white">
      <Link href="/">
        <ArrowLeftIcon width={24} height={24} />
      </Link>
      <TextField.Root className="flex-auto">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Search theme..." value={query} onChange={handleChange} />
      </TextField.Root>
    </div>
  )
}
