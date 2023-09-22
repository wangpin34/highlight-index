import fs from 'fs/promises'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)

const base = path.resolve('node_modules/prismjs/themes')


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
  const names = files.map(file => path.relative(base,file)).map(uri => uri.replaceAll(path.sep, '/'))
  return names
}

export async function listThemes() {
  const files = await listThemeCSSFiles()
  return files.filter(file => !file.endsWith('.min.css')).map(file => file.replace(/^prism-/, '').replace(/\.css$/, ''))
}


if(process.argv[1] === __filename) {
  listThemes().then(files => fs.writeFile('public/prism-js-themes.json', JSON.stringify(files), 'utf-8'))
}