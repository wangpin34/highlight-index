import { listThemes } from "@/utils/list-highlight.js-themes.mjs";
import ThemeCard from '@/components/theme-card'
import loadConfig from "@/utils/load-config"
import Link from 'next/link'

export default async function Home() {
  const config = await loadConfig()
  const themes = await listThemes()
  const themesForHome = themes.slice(0,3)
  const isDark = (theme: string) => { 
    const index = config['dark_themes'].indexOf(theme)
    const hasDark = theme.toLowerCase().indexOf("dark") > -1 || theme.toLowerCase().indexOf("black") > -1
    return index > -1 || hasDark
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div id="catalog">
        <div id="highlight-js-themes" className="bg-amber-950">
          <h1 className="text-lg text-amber-950">
            highlight.js {themes.length} themes <Link href="/highlightjs" className="font-bold text-blue-600">View all</Link>
          </h1>
          <div className="flex gap-4 flex-wrap">
          {themesForHome?.map(theme => <ThemeCard key={theme} theme={theme} isDark={isDark(theme)} />)}
          </div>
        </div>
      </div>
    </main>
  )
}
