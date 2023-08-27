import * as yaml from 'js-yaml'
import fs from 'fs/promises'
import type { ContextType } from '@/contexts/global'

export default async function loadConfig() {
  const config = await yaml.load(await fs.readFile('./config.yaml', 'utf-8')) 
  return config as ContextType['config']
}

export async function isDark(themeName: string) {
  if (themeName.toLowerCase().indexOf('dark') > -1) {
    return true
  }
  const config: ContextType['config'] = await loadConfig()
  const darkThemes = config['dark_themes']
  return darkThemes.indexOf(themeName) > -1
}