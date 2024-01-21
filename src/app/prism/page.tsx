'use client'
import PrismThemeCard from '@/components/prism-theme-card'
import Themes from '@/components/themes'
import TopSearch from '@/components/top-search'
import '@/stores/preferences'
import type { Theme } from '@/types/theme'
import Fuse from 'fuse.js'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense, useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'

const fuseOptions = { keys: ['name'] }

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function HighlightThemes() {
  const { data, error, isLoading, mutate } = useSWR<{ themes: Theme[] }>('/prism/api', fetcher)
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState<string>('')
  const onQueryChange = useCallback((query: string) => setQuery(query), [])
  const fuse = useMemo(() => new Fuse(data?.themes || [], fuseOptions), [data])
  const themes = useMemo(() => (query ? fuse.search(query).map((item) => item.item) : data?.themes), [fuse, data, query])

  return (
    <>
      <Suspense>
        <TopSearch onChange={onQueryChange} />
      </Suspense>
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
