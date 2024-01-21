import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const nodeModules = path.resolve('node_modules')
const base = path.resolve('node_modules/highlight.js/styles')

export async function isDir(file) {
  const stats = await fs.stat(file)
  return stats.isDirectory()
}

export async function traverFile(file) {
  const files = new Array()
  const list = new Array()
  list.push(file)
  while (list.length) {
    const f = list.shift()
    if (await isDir(f)) {
      const results = await fs.readdir(f)
      const _files = results.map((r) => path.join(f, r))
      if (_files != null) {
        list.push(..._files)
      }
    } else {
      if (f.endsWith('.css')) {
        files.push(f)
      }
    }
  }
  return files
}

export async function listThemeCSSFiles() {
  const files = await traverFile(base)
  const names = files.map((file) => path.relative(base, file)).map((uri) => uri.replaceAll(path.sep, '/'))
  return names
}

function fileToTheme(file, baseDir) {
  const filename = path.relative(baseDir, file).replace('.css', '.min.css')
  const name = path
    .relative(baseDir, file)
    .replace(/\.css$/, '')
    .replaceAll(/[\/\\/]/g, '_')
  const uri = path.relative(nodeModules, file).replaceAll(path.sep, '/')
  const cdn = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${filename}`
  const github = `https://github.com/highlightjs/highlight.js/blob/main/src/styles/${filename}`
  return {
    name,
    uri,
    cdn,
    github,
  }
}

export async function listThemes() {
  const files = await traverFile(base)
  const names = files.filter((file) => file.endsWith('.css'))
  return names.map((file) => fileToTheme(file, base))
}

if (process.argv[1] === __filename) {
  listThemes().then((files) => fs.writeFile('data/hljs-themes.json', JSON.stringify(files), 'utf-8'))
}
