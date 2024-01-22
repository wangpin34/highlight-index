import { ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

interface Props {
  onChange: (query: string) => void
}

export default function TopSearch({ onChange }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setQuery(e.target.value)
  }, [])
  useEffect(() => {
    onChange(query)
  }, [query, onChange])

  useEffect(() => {
    if (query) {
      router.push(`${pathname}?query=${query}`, { scroll: false })
    }
  }, [query, router, pathname])

  return (
    <Box
      className="w-screen h-12 px-4 fixed top-0 left-0 flex items-center gap-4 shadow-sm z-10"
      style={{ background: 'var(--color-background)' }}
    >
      <Link href="/">
        <ArrowLeftIcon width={24} height={24} />
      </Link>
      <TextField.Root className="flex-auto">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Search theme..." value={query} onChange={handleChange} />
      </TextField.Root>
    </Box>
  )
}
