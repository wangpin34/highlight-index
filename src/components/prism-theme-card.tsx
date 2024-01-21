'use client'
import { Box, Card, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import jsCode from '@/code-snippets/js'
import { snakeToNormal } from '@/utils/string-transformer'
import styles from './theme-card.module.css'

export default function ThemeCard({
  theme,
  uri,
  cdn,
  onClick,
  language = 'typescript',
}: {
  theme: string
  uri: string
  cdn: string
  onClick?: () => void
  language?: string
}) {
  const languageRef = useRef(language)
  const [languageLoaded, setLoaded] = useState<boolean>(false)
  useEffect(() => {
    import(`prismjs/components/prism-${languageRef.current}`).then(() => {
      setLoaded(true)
    })
  }, [])
  const html = useMemo(() => (languageLoaded ? Prism.highlight(jsCode, Prism.languages.typescript, 'typescript') : ''), [languageLoaded])
  const frameRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        let shadowRoot = node.shadowRoot
        if (!shadowRoot) {
          shadowRoot = node.attachShadow({ mode: 'open' })
        }
        const styleLink = cdn
        shadowRoot.innerHTML = `
        <link
        rel="stylesheet"
        href="${styleLink}"
      ></link>
      <pre data-code-theme="${theme}" class="prism language-typescript" style="margin: unset; padding: 8px; font-size: 12px; overflow: hidden;"><code>${html}</code></pre>`
      }
    },
    [theme, html, cdn]
  )
  return (
    <Card onClick={onClick} className="max-w-[300px] w-[280px] cursor-pointer">
      <Box ref={frameRef}>
        <pre className={classnames(styles.frame, 'prism lang-typescript', theme)} data-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </Box>
      <Box className={classnames('px-2')}>
        <Text as="span" className="text-xs">
          {snakeToNormal(theme)}
        </Text>
      </Box>
    </Card>
  )
}
