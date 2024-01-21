'use client'
import { useTheme } from '@/stores/preferences'
import { Theme } from '@/types/preferences'
import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Box, Heading, IconButton } from '@radix-ui/themes'
import { useCallback } from 'react'

export default function Header() {
  // const theme = useStore(useTheme, (state: ThemeState) => state.theme)
  // const setTheme = useStore(useTheme, (state: ThemeState) => state.setTheme)
  const [theme, setTheme] = useTheme((state) => [state.theme, state.setTheme])

  console.log(`theme`, theme)

  const toggleTheme = useCallback(() => {
    if (theme === Theme.Light) {
      setTheme && setTheme(Theme.Dark)
    } else {
      setTheme && setTheme(Theme.Light)
    }
  }, [setTheme, theme])
  return (
    <Box className="w-screen h-16 fixed top-0 left-0 flex items-center shadow-sm z-10" style={{ background: 'var(--color-background)' }}>
      <Box className="relative w-full h-full flex items-center px-6">
        <Box className="flex-auto"></Box>
        <Heading className="h-full absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <span>Theme Hub</span>
        </Heading>
        <Box className="flex items-center gap-3 p-5 z-10">
          {/* <IconButton variant="ghost" color="gray">
            <GearIcon width={16} height={16} />
          </IconButton> */}
          <IconButton variant="ghost" color="gray" onClick={toggleTheme}>
            {theme === Theme.Light ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />}
          </IconButton>
          <a href="https://github.com/wangpin34/highlight-index" target="_blank">
            <GitHubLogoIcon width={16} height={16} />
          </a>
        </Box>
      </Box>
    </Box>
  )
}
