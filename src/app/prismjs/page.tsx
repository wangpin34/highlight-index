
"use client";
import PrismThemeCard from "@/components/prism-theme-card";
import { Input } from "@material-tailwind/react";

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import useSWR from "swr";
import Fuse from 'fuse.js'

const fuseOptions = {
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HighlightThemes() {
  const { data, error, isLoading, mutate } = useSWR<{ themes: string[] }>(
    "/prismjs/api",
    fetcher
    );
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState<string>(searchParams.get('keyword') || '')
  const query = useDebounce(keyword, 500)
  const fuse = useMemo(() => new Fuse(data?.themes || [], fuseOptions), [data])
  const themes = useMemo(() => query ? fuse.search(query).map(item => item.item) : data?.themes, [fuse, data, query])


  useEffect(() => {
    if (query) {
      router.push(`${pathname}?keyword=${query}`, {scroll: false})
    }
  }, [query, router, pathname])

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center py-4 px-6">
        <div className="">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex w-full h-full items-center py-4 px-6">
        <span>error</span>
        <button onClick={mutate}>Reload</button>
      </div>
    );
  }
  return (
    <div className="py-4 px-6 flex flex-col items-center">
      <div className="w-full py-2">
        <div className="w-4">
        <Input label="Search" icon={<span className="material-icons-outlined text-slate-400">search</span>} crossOrigin={undefined} value={keyword} onChange={e => setKeyword(e.target.value)}/>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap ">
        {themes?.map((theme) => (
          <PrismThemeCard key={theme} theme={theme} onClick={() => router.push(`${pathname}/${theme}`)}/>
        ))}
      </div>
    </div>
  );
}