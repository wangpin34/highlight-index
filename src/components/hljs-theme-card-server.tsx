import { useCallback } from "react";
import classnames from "classnames";
import hljs from "highlight.js";
import styles from "./theme-card.module.css";
import jsCode from '@/code-snippets/js'
import { snakeToNormal } from '@/utils/string-transformer'
import { hljsHightlight, getRawHljsTheme, prefixCSS } from '@/utils/highlight-utils'

export default async function ThemeCard({
  theme,
  onClick,
  language = 'typescript'
}: {
  theme: string;
  onClick?: () => void
  language?: string
}) {
 const rawStyle = await getRawHljsTheme(theme)
  const css = prefixCSS(rawStyle, `.theme-${theme}`)
  const html = hljsHightlight(jsCode)

  return (
    <section
      className={classnames(
        styles["card-container"],
        "shadow-lg shadow-slate-200 rounded-md transition-shadow",
        {
          'hover:shadow-xl': !!onClick,
          'cursor-pointer': !!onClick,
        }
      )}
      onClick={onClick}
    >
      <div>
        <style dangerouslySetInnerHTML={{ __html: css }}>
        </style>
        <pre className={classnames(styles.frame, `hljs theme-${theme}`)} data-theme={theme}>
          <code className="hljs" dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </div>
      <div className={classnames('bg-slate-200', "px-2")}>
        <span className="text-xs">{snakeToNormal(theme)}</span>
      </div>
    </section>
  );
}
