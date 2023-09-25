import { listThemes as listHighlightThemes } from "@/utils/list-highlight.js-themes.mjs";
import { listThemes as ListPrismThemes } from "@/utils/list-prism.js-themes.mjs";
import HljsThemeCard from '@/components/hljs-theme-card-server'
import PrismThemeCard from '@/components/prism-theme-card-server'
import Link from 'next/link'

export default async function Home() {
  const highlightThemes = await listHighlightThemes()
  const highlightThemesForHome = highlightThemes.slice(0,3)

  const prismThemes = await ListPrismThemes()
  const prismThemesForHome = prismThemes.slice(0,3)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div id="catalog">
        <div id="highlight-js-themes" className="bg-amber-950">
          <h1 className="text-lg text-amber-950">
            highlight.js {highlightThemes.length} themes <Link href="/highlightjs" className="font-bold text-blue-600">View all</Link>
          </h1>
          <div className="flex gap-4 flex-wrap">
          {highlightThemesForHome?.map(theme => <HljsThemeCard key={theme} theme={theme}/>)}
          </div>
        </div>

         <div id="prism-js-themes" className="bg-amber-950">
          <h1 className="text-lg text-amber-950">
            prism.js {prismThemes.length} themes <Link href="/prismjs" className="font-bold text-blue-600">View all</Link>
          </h1>
          <div className="flex gap-4 flex-wrap">
          {prismThemesForHome?.map(theme => <PrismThemeCard key={theme.name} theme={theme.name} uri={theme.uri}/>)}
          </div>
        </div>
      </div>
    </main>
  )
}
