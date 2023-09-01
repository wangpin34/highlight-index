import { listThemes } from "@/utils/list-highlight.js-themes.mjs";
import hljs from "highlight.js";
import styles from "./page.module.css";

const code = `import React from 'react'
export default function App() {
  return (
    <div>I love React</div>
  )
}
`;

const html = hljs.highlight(code, { language: "typescript" }).value;

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export default function HighlightDemo({
  params,
}: {
  params: { theme: string[] };
}) {
  const theme = params.theme.map(p => camelToSnakeCase(p)).join("/")
  const frameTheme =
    (theme.toLowerCase().indexOf("dark") > -1 || theme.toLowerCase().indexOf("black") > -1) ? "dark" : "light";
  return (
    <div className={styles["frame-container"]} data-theme={frameTheme}>
      <link
        rel="stylesheet"
        href={`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${theme}.min.css`}
      ></link>
      <pre className={styles.frame} data-code-theme={theme}>
        <code dangerouslySetInnerHTML={{ __html: html }}></code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const themes = await listThemes();

  return themes.map((theme) => ({
    theme: [...theme.split("/")],
  }));
}
