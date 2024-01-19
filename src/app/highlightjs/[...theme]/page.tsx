import githubLogo from '@/assets/github-mark.png'
import jsCode from '@/code-snippets/js'
import ThemeHeader from '@/components/theme-header'
import { hljsHightlight } from '@/utils/highlight-utils'
import { listThemes } from '@/utils/list-highlight.js-themes.mjs'
import { camelToSnakeCase, snakeToNormal } from '@/utils/string-transformer'
import Image from 'next/image'

export default function Highlight({ params }: { params: { theme: string[] } }) {
  const html = hljsHightlight(jsCode)
  const theme = params.theme.map((p) => camelToSnakeCase(p)).join('/')
  const styleLink = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${theme}.min.css`
  return (
    <>
      <ThemeHeader title={snakeToNormal(params.theme.join(' '))} backTo="/highlightjs" />
      <div className="box-border lg:p-6 h-full px-6">
        <link rel="stylesheet" href={styleLink}></link>
        <div className="w-full lg:w-2/3 h-full m-auto shadow-md hover:shadow-lg rounded-lg">
          <div className="hljs py-1 rounded-t-lg"></div>
          <pre className="hljs p-2" data-code-theme={theme}>
            <code dangerouslySetInnerHTML={{ __html: html }}></code>
          </pre>
          <div className="px-2 py-4">
            <div className="flex flex-row items-center">
              <a
                href={`https://github.com/highlightjs/highlight.js/blob/main/src/styles/${theme}.css`}
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

export async function generateStaticParams() {
  const themes = await listThemes()

  return themes.map((theme) => ({
    theme: [...theme.split('/')],
  }))
}
