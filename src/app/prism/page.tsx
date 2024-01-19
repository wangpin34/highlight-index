'use client'
import PrismThemeCard from '@/components/prism-theme-card'
import Themes from '@/components/themes'
import TopSearch from '@/components/top-search'
import useDebounce from '@/hooks/useDebounce'
import type { Theme } from '@/types/theme'
import Fuse from 'fuse.js'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

const fuseOptions = { keys: ['name'] }

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function HighlightThemes() {
  const { data, error, isLoading, mutate } = useSWR<{ themes: Theme[] }>('/prism/api', fetcher)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState<string>(searchParams.get('keyword') || '')
  const query = useDebounce(keyword, 500)
  const fuse = useMemo(() => new Fuse(data?.themes || [], fuseOptions), [data])
  const themes = useMemo(() => (query ? fuse.search(query).map((item) => item.item) : data?.themes), [fuse, data, query])

  useEffect(() => {
    if (query) {
      router.push(`${pathname}?keyword=${query}`, { scroll: false })
    }
  }, [query, router, pathname])

  return (
    <>
      <TopSearch query={keyword} onChange={(query) => setKeyword(query)} />
      <Themes
        loading={isLoading}
        error={error}
        themes={themes ?? []}
        themeRender={({ name, uri, cdn }) => (
          <PrismThemeCard key={name} theme={name} uri={uri} cdn={cdn} onClick={() => router.push(`${pathname}/${name}`)} />
        )}
        onReload={mutate}
      />
    </>
  )
}
