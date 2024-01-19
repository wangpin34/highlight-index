import githubLogo from '@/assets/github-mark.png'
import jsCode from '@/code-snippets/js'
import ThemeHeader from '@/components/theme-header'
import { hljsHightlight } from '@/utils/highlight-utils'
import { getHljsTheme, listHljsThemes } from '@/utils/server-helper'
import Image from 'next/image'

export default async function Highlight({ params }: { params: { theme: string[] } }) {
  const html = hljsHightlight(jsCode)
  const theme = params.theme.join('/')
  const metadata = await getThemeMeta(theme)
  return (
    <>
      <ThemeHeader title={metadata?.name ?? theme} backTo="/hljs" />
      <div className="box-border lg:p-6 h-full px-6">
        <link rel="stylesheet" href={metadata?.cdn}></link>
        <div className="w-full lg:w-2/3 h-full m-auto shadow-md hover:shadow-lg rounded-lg">
          <div className="hljs py-1 rounded-t-lg"></div>
          <pre className="hljs p-2" data-code-theme={theme}>
            <code dangerouslySetInnerHTML={{ __html: html }}></code>
          </pre>
          <div className="px-2 py-4">
            <div className="flex flex-row items-center">
              <a
                href={metadata?.github}
                target="_blank"
                className="ml-2 text-blue-600 hover:text-blue-900 break-normal"
                style={{ overflowWrap: 'anywhere' }}
              >
                <Image src={githubLogo} alt="logo of github" width="20" height="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getThemeMeta(name: string) {
  const theme = await getHljsTheme(name)
  return theme
}

export async function generateStaticParams() {
  const themes = await listHljsThemes()

  return themes.map((theme) => ({
    theme: [theme.name],
  }))
}
