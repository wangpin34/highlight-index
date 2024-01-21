'use client'
import jsCode from '@/code-snippets/js'
import type { Theme } from '@/types/theme'
import { snakeToNormal } from '@/utils/string-transformer'
import { Box, Card, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import hljs from 'highlight.js'
import { useCallback } from 'react'
import styles from './theme-card.module.css'

const html = hljs.highlight(jsCode, { language: 'typescript' }).value

export default function ThemeCard({ theme, onClick }: { theme: Theme; onClick?: () => void }) {
  const frameRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        let shadowRoot = node.shadowRoot
        if (!shadowRoot) {
          shadowRoot = node.attachShadow({ mode: 'open' })
        }
        shadowRoot.innerHTML = `
      <link
        rel="stylesheet"
        href="${theme.cdn}"
      ></link><pre data-code-theme="${theme}" class="hljs language-typescript" style="margin: unset; padding: 8px; font-size: 12px; overflow: hidden;"><code>${html}</code></pre>`
      }
    },
    [theme]
  )
  return (
    <Card className="max-w-[300px] w-[280px] cursor-pointer" onClick={onClick}>
      <Box ref={frameRef}>
        <pre className={styles.frame} data-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </Box>
      <Box className={classnames('px-2')}>
        <Text as="span" className="text-xs">
          {snakeToNormal(theme.name)}
        </Text>
      </Box>
    </Card>
  )
}
