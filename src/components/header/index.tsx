'use client'

import { GearIcon, GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Box, Heading, IconButton } from '@radix-ui/themes'
import { useCallback, useEffect, useState } from 'react'

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export default function Header() {
  const [theme, setTheme] = useState<Theme | undefined>()

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('preferences.theme')
    if (currentTheme === Theme.Light || currentTheme === Theme.Dark) {
      setTheme(currentTheme)
    } else {
      setTheme(Theme.Light)
    }
  }, [])
  useEffect(() => {
    if (theme === Theme.Light) {
      document.body.classList.remove('dark')
      document.body.classList.add('light')
      window.localStorage.setItem('preferences.theme', Theme.Light)
    }
    if (theme === Theme.Dark) {
      document.body.classList.remove('light')
      document.body.classList.add('dark')
      window.localStorage.setItem('preferences.theme', Theme.Dark)
    }
  }, [theme])
  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      if (current === Theme.Light) {
        return Theme.Dark
      } else {
        return Theme.Light
      }
    })
  }, [])
  return (
    <Box className="w-screen h-16 fixed top-0 left-0 flex items-center shadow-sm">
      <Box className="relative w-full h-full flex items-center px-6">
        <Box className="flex-auto"></Box>
        <Heading className="h-full absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <span>Theme Hub</span>
        </Heading>
        <Box className="flex items-center gap-3 p-5 z-10">
          <IconButton variant="ghost" color="gray">
            <GearIcon width={16} height={16} />
          </IconButton>
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
