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
      ></link><pre data-code-theme="${theme}" style="background-color: var(--syntax-background-color); color: var(--syntax-font-color); margin: unset;"><code>${html}</code></pre>`;
      }
    },
    [theme]
  );
  return (
    <section
      data-theme={cardTheme}
      className={classnames(
        styles["card-container"],
        "border-solid border-2 border-slate-100 rounded-md"
      )}
    >
      <div ref={frameRef} className="p-4">
        <pre className={styles.frame} data-code-theme={theme}>
          <code>{code}</code>
        </pre>
      </div>
      <div className={classnames(styles.actions, "px-2")}>
        <span className="text-xs">{theme}</span>
      </div>
    </section>
  );
}
