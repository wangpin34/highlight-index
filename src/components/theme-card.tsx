'use client'
import jsCode from '@/code-snippets/js'
import type { Theme } from '@/types/theme'
import { snakeToNormal } from '@/utils/string-transformer'
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
      ></link><pre data-code-theme="${theme}" class="hljs language-typescript" style="margin: unset; padding: 8px;"><code>${html}</code></pre>`
      }
    },
    [theme]
  )
  return (
    <section
      className={classnames(styles['card-container'], 'shadow-lg shadow-slate-200 rounded-md transition-shadow grow', {
        'hover:shadow-xl': !!onClick,
        'cursor-pointer': !!onClick,
      })}
      onClick={onClick}
    >
      <div ref={frameRef}>
        <pre className={styles.frame} data-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </div>
      <div className={classnames('bg-slate-200', 'px-2')}>
        <span className="text-xs">{snakeToNormal(theme.name)}</span>
      </div>
    </section>
  )
}
