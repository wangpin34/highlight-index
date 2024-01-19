import githubLogo from '@/assets/github-mark.png'
import jsCode from '@/code-snippets/js'
import ThemeHeader from '@/components/theme-header'
import { prismHighlight } from '@/utils/highlight-utils'
import { listThemes } from '@/utils/list-prism.js-themes.mjs'
import { camelToSnakeCase, snakeToNormal } from '@/utils/string-transformer'
import Image from 'next/image'

export default async function HighlightDemo({ params }: { params: { theme: string[] } }) {
  const theme = params.theme.map((p) => camelToSnakeCase(p)).join('/')
  const themeMeta = await getThemeMeta(params.theme.join('/'))
  const html = prismHighlight(jsCode, 'typescript')
  return (
    <>
      <ThemeHeader title={snakeToNormal(params.theme.join(' '))} backTo="/prismjs" />
      <div className="box-border lg:p-6 h-full px-6">
        <link rel="stylesheet" href={themeMeta?.cdn}></link>
        <div className="w-2/3 h-full m-auto shadow-md hover:shadow-lg rounded-lg">
          <pre className="language-typescript rounded-br-none rounded-bl-none" data-code-theme={theme}>
            <code dangerouslySetInnerHTML={{ __html: html }}></code>
          </pre>
          <div className="px-2 py-4">
            <div className="flex flex-row items-center">
              <a
                href={themeMeta?.github}
                target="_blank"
                className="ml-2 text-blue-600 x:text-blue-900 break-normal"
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
  const themes = await listThemes()
  return themes.find((theme) => theme.name === name)
}

export async function generateStaticParams() {
  const themes = await listThemes()
  const params = themes.map((theme) => ({
    theme: [...theme.name.split('/')],
  }))
  return params
}
