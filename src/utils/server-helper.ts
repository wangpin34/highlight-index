import { Theme } from '@/types/theme'
import fs from 'node:fs/promises'

export async function listHljsThemes() {
  const themes: Array<Theme> = await fs.readFile('data/hljs-themes.json', 'utf-8').then((r) => JSON.parse(r))
  return themes
}

export async function listPrismThemes() {
  const themes: Array<Theme> = await fs.readFile('data/prism-themes.json', 'utf-8').then((r) => JSON.parse(r))
  return themes
}

export async function getPrismTheme(name: string) {
  const themes = await listPrismThemes()
  return themes.find((theme) => theme.name === name)
}

export async function getHljsTheme(name: string) {
  const themes = await listHljsThemes()
  return themes.find((theme) => theme.name === name)
}

export async function getTheme(name: string) {
  const _themes = await Promise.all([listPrismThemes(), listHljsThemes()])
  const themes = _themes.flat()
  return themes.find((theme) => theme.name === name)
}
