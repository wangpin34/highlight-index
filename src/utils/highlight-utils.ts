// Make sure to this utils on the server side
import fs from "fs/promises";
import path from "path";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-go-module";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-lisp";
import "prismjs/components/prism-scheme";
import "prismjs/components/prism-coffeescript";
import "prismjs/components/prism-clojure";
import "prismjs/components/prism-elixir";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-less";

import hljs from "highlight.js";

import postcss from "postcss";
import prefixSelector from "postcss-prefix-selector";

const prismBase = path.resolve("node_modules/prismjs/themes");
const hljsBase = path.resolve("node_modules/highlight.js/styles");

export function prismHighlight(code: string, lang: string) {
  return Prism.highlight(code, Prism.languages[lang], lang);
}

export function prefixCSS(css: string, prefix: string) {
  try {
    const out = postcss()
      .use(
        prefixSelector({
          prefix,
          transform(prefix, selector, prefixedSelector, file) {
            if (selector.startsWith('pre ')) {
              return `${selector.replace('pre ', `pre${prefix} `)}`;
            }
            return `${prefix} ${selector}`
          },
        })
      )
      .process(css).css;
    return out;
  } catch (err) {
    console.error(err);
    return css;
  }
}

export async function getRawHljsTheme(theme: string) {
  const filepath = path.join(hljsBase, theme + ".css");
  return fs.readFile(filepath, "utf-8");
}

export async function getRawPrismTheme(theme: string) {
  const filepath = path.join(
    prismBase,
    theme.startsWith("prism-") ? `${theme}.css` : `prism-${theme}.css`
  );
  const result = await fs.readFile(filepath, "utf-8");
  return result;
}

export function hljsHightlight(code: string) {
  return hljs.highlightAuto(code).value;
}
