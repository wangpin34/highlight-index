"use client";
import { useCallback, useMemo } from "react";
import classnames from "classnames";
import hljs from "highlight.js";
import styles from "./theme-card.module.css";
import jsCode from '@/code-snippets/js'
import { snakeToNormal } from '@/utils/string-transformer'

const html = hljs.highlight(jsCode, { language: "typescript" }).value;

export default function ThemeCard({
  theme,
  onClick
}: {
  theme: string;
  onClick?: () => void
}) {

  const frameRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        let shadowRoot = node.shadowRoot;
        if (!shadowRoot) {
          shadowRoot = node.attachShadow({ mode: "open" });
        }
        shadowRoot.innerHTML = `
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${theme}.min.css"
      ></link><pre data-code-theme="${theme}" class="hljs" style="margin: unset; padding: 8px;"><code>${html}</code></pre>`;
      }
    },
    [theme]
  );
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
      <div ref={frameRef}>
        <pre className={styles.frame} data-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
      </div>
      <div className={classnames('bg-slate-200', "px-2")}>
        <span className="text-xs">{snakeToNormal(theme)}</span>
      </div>
    </section>
  );
}
