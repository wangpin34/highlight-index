import jsCode from '@/code-snippets/js'
import ThemeHeader from '@/components/theme-header'
import '@/stores/preferences'
import { prismHighlight } from '@/utils/highlight-utils'
import { listThemes } from '@/utils/list-prism.js-themes.mjs'
import { getPrismTheme } from '@/utils/server-helper'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Box, Card } from '@radix-ui/themes'

export default async function HighlightDemo({ params }: { params: { theme: string[] } }) {
  const theme = params.theme.join('/')
  const metadata = await getThemeMeta(theme)
  const html = prismHighlight(jsCode, 'typescript')
  return (
    <>
      <ThemeHeader title={metadata?.name ?? theme} backTo="/prism" />
      <link rel="stylesheet" href={metadata?.cdn} />
      <Box className="p-4">
        <Card>
          <pre className="language-typescript rounded-br-none rounded-bl-none" data-code-theme={theme}>
            <code dangerouslySetInnerHTML={{ __html: html }}></code>
          </pre>
          <Box className="px-2 py-4">
            <Box className="flex flex-row items-center">
              <a href={metadata?.github} target="_blank" style={{ overflowWrap: 'anywhere' }}>
                <GitHubLogoIcon width={16} height={16} />
              </a>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  )
}

async function getThemeMeta(name: string) {
  const theme = await getPrismTheme(name)
  return theme
}

export async function generateStaticParams() {
  const themes = await listThemes()
  const params = themes.map((theme) => ({
    theme: [theme.name],
  }))
  return params
}
