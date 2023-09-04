"use client";
import { useCallback, useMemo } from "react";
import classnames from "classnames";
import hljs from "highlight.js";
import styles from "./theme-card.module.css";

const code = `import React from 'react'
export default function App() {
  return (
    <div>I love React</div>
  )
}
`;

const html = hljs.highlight(code, { language: "typescript" }).value;

export default function ThemeCard({
  theme,
  isDark,
}: {
  theme: string;
  isDark?: boolean;
}) {
  const cardTheme = useMemo(() => (isDark ? "dark" : "light"), [isDark]);

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
      data-theme={cardTheme}
      className={classnames(
        styles["card-container"],
        "shadow-lg shadow-slate-200 rounded-md"
      )}
    >
      <div ref={frameRef}>
        <pre className={styles.frame} data-code-theme={theme}>
          <code>{code}</code>
        </pre>
      </div>
      <div className={classnames('bg-slate-200', "px-2")}>
        <span className="text-xs">{theme}</span>
      </div>
    </section>
  );
}
