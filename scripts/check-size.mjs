// Fails when the build breaks the page budget: JS+CSS under 250 KB gzip, whole dist under 1 MB.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { gzipSync } from 'node:zlib'

const GZIP_LIMIT = 250 * 1024
const DIST_LIMIT = 1024 * 1024

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const files = walk('dist')
const total = files.reduce((s, f) => s + statSync(f).size, 0)
const code = files.filter((f) => ['.js', '.css'].includes(extname(f)))
const gz = code.reduce((s, f) => s + gzipSync(readFileSync(f)).length, 0)

const kb = (n) => `${(n / 1024).toFixed(1)} KB`
console.log(`check-size: JS+CSS gzip ${kb(gz)} (limit ${kb(GZIP_LIMIT)}), dist ${kb(total)} (limit ${kb(DIST_LIMIT)})`)
if (gz > GZIP_LIMIT || total > DIST_LIMIT) process.exit(1)
