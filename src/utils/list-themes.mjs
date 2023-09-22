import { listThemes as listHighlightThemes } from './list-highlight.js-themes.mjs/index.js'
import { listThemes as listPrismThemes } from './list-prism.js-themes.mjs/index.js'


export default async function listThemes() {
  const themes = await Promise.all([listThemes(), listPrismThemes]).then(([highlight, prism]) => {
    return [
      ...highlight.map(name => ({
        name,
        source: 'highlight'
      })),
      ...prism.map(name => ({
        name,
        source: 'prism'
      })),
    ]
  })
  return themes
}