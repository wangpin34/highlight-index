"use client";
import ThemeCard from '@/components/theme-card'
import loadConfig from "@/utils/load-config"
import Header from '@/components/header'
import { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url:string) => fetch(url).then(r => r.json())

export default function HighlightThemes() {
  const { data, error, isLoading, mutate } = useSWR<{themes: string[]}>('/highlightjs/api', fetcher)
  if (isLoading) {
    return <div className="flex w-full h-full items-center py-4 px-6">
      <div className="">
      Loading...
      </div>
      </div>
  }
  if (error) {
    return <div className="flex w-full h-full items-center py-4 px-6">
    <span>error</span>
    <button onClick={mutate}>Reload</button>
    </div>
  }
  return <div className="py-4 px-6 flex items-center">Highlight js themes - {data?.themes?.length}
  
  <div className="flex gap-4 flex-wrap ">
        {data?.themes?.map(theme => <ThemeCard key={theme} theme={theme} />)}  
      </div>

      </div>
}

 