import classnames from "classnames";
import { prismHighlight, getRawPrismTheme, getRawPrismThemeByURI, prefixCSS } from '@/utils/highlight-utils'

import styles from "./theme-card.module.css";
import jsCode from '@/code-snippets/js'
import { snakeToNormal } from '@/utils/string-transformer'

export default async function ThemeCard({
  theme,
  uri,
  onClick,
  language = 'typescript'
}: {
  theme: string
  uri: string
  onClick?: () => void
  language?: string
}) {
  const selectorPrefix = `.${theme}`
  const rawStyle = await getRawPrismThemeByURI(uri)
  const css = prefixCSS(rawStyle, selectorPrefix)
  const html = prismHighlight(jsCode, language)
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
      <div className={theme}>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <pre className={classnames(styles.frame, 'prism language-typescript', theme)} data-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }} className={classnames(`language-${language}`, theme)}></code>
        </pre>
      </div>
      <div className={classnames('bg-slate-200', "px-2")}>
        <span className="text-xs">{snakeToNormal(theme)}</span>
      </div>
    </section>
  );
}
