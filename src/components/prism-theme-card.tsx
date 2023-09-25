"use client";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import classnames from "classnames";
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

import styles from "./theme-card.module.css";
import jsCode from '@/code-snippets/js'
import { snakeToNormal } from '@/utils/string-transformer'

export default function ThemeCard({
  theme,
  uri,
  cdn,
  onClick,
  language = 'typescript'
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
  const html = useMemo(() =>  languageLoaded ? Prism.highlight(jsCode, Prism.languages.typescript, 'typescript') : '', [languageLoaded])
  const frameRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        let shadowRoot = node.shadowRoot;
        if (!shadowRoot) {
          shadowRoot = node.attachShadow({ mode: "open" });
        }
        const styleLink = cdn
        shadowRoot.innerHTML = `
        <link
        rel="stylesheet"
        href="${styleLink}"
      ></link>
      <pre data-code-theme="${theme}" class="prism language-typescript" style="margin: unset; padding: 8px;"><code>${html}</code></pre>`;
      }
    },
    [theme, html, cdn]
  );
  return (
    <section
      className={classnames(
        styles["card-container"],
        "shadow-lg shadow-slate-200 rounded-md transition-shadow sm:w-full md:w-auto",
        {
          'hover:shadow-xl': !!onClick,
          'cursor-pointer': !!onClick,
        }
      )}
      onClick={onClick}
    >
      <div ref={frameRef}>
        <pre className={classnames(styles.frame, 'prism lang-typescript', theme)} data-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </div>
      <div className={classnames('bg-slate-200', "px-2")}>
        <span className="text-xs">{snakeToNormal(theme)}</span>
      </div>
    </section>
  );
}
