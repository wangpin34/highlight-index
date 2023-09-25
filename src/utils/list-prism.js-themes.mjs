import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

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

const base = path.resolve('node_modules')
const baseCore = path.join(base, 'prismjs/themes')
const additional = path.join(base, 'prism-themes/themes')

function fileToTheme(file, baseDir) {
  const filename = path.basename(file)
  const name = path
    .relative(baseDir, file)
    .replace(/^prism-/, '')
    .replace(/\.css$/, '')
  const uri = path.relative(base, file).replaceAll(path.sep, '/')
  const cdn =
    baseDir === additional
      ? `https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/${filename}`
      : `https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/${filename}`
  const github =
    baseDir === additional
      ? `https://github.com/PrismJS/prism-themes/blob/master/themes/${filename}`
      : `https://github.com/PrismJS/prism/tree/master/themes/${filename}`
  return {
    name,
    uri,
    cdn,
    github,
  }
}

export async function listThemes() {
  const files0 = await traverFile(baseCore)
  const files1 = await traverFile(additional)
  const names0 = files0.filter((file) => !file.endsWith('.min.css')).map((file) => fileToTheme(file, baseCore))
  const names1 = files1.filter((file) => !file.endsWith('.min.css')).map((file) => fileToTheme(file, additional))
  return [...names0, ...names1]
}

if (process.argv[1] === __filename) {
  listThemes().then((files) => fs.writeFile('public/prism-js-themes.json', JSON.stringify(files), 'utf-8'))
}
