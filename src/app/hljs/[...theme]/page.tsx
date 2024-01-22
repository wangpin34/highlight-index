import jsCode from '@/code-snippets/js'
import ThemeHeader from '@/components/theme-header'
import '@/stores/preferences'
import { hljsHightlight } from '@/utils/highlight-utils'
import { getHljsTheme, listHljsThemes } from '@/utils/server-helper'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Box, Card } from '@radix-ui/themes'

export default async function Highlight({ params }: { params: { theme: string[] } }) {
  const html = hljsHightlight(jsCode)
  const theme = params.theme.join('/')
  const metadata = await getThemeMeta(theme)
  return (
    <>
      <ThemeHeader title={metadata?.name ?? theme} backTo="/hljs" />
      <link rel="stylesheet" href={metadata?.cdn} />
      <Box className="p-4">
        <Card>
          <Box className="w-full lg:w-2/3 h-full m-auto shadow-md hover:shadow-lg rounded-lg">
            <pre className="hljs p-2" data-code-theme={theme}>
              <code dangerouslySetInnerHTML={{ __html: html }}></code>
            </pre>
            <Box className="px-2 py-4">
              <Box className="flex flex-row items-center">
                <a href={metadata?.github} target="_blank" style={{ overflowWrap: 'anywhere' }}>
                  <GitHubLogoIcon width={16} height={16} />
                </a>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  )
}

async function getThemeMeta(name: string) {
  const theme = await getHljsTheme(name)
  return theme
}

export async function generateStaticParams() {
  const themes = await listHljsThemes()

  return themes.map((theme) => ({
    theme: [theme.name],
  }))
}
