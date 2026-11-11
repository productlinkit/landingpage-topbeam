// Fails when page copy breaks the product plan's claim rules (see the revamp spec).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const BANNED = [/—/, /\bpertama\b/i, /satu-satunya/i, /kurang dari satu menit/i, /terverifikasi/i, /ingat nomor/i]
const EXT = new Set(['.js', '.jsx', '.css', '.html'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (EXT.has(extname(p))) out.push(p)
  }
  return out
}

const files = [...walk('src'), 'index.html']
const hits = []
for (const file of files) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const re of BANNED) if (re.test(line)) hits.push(`${file}:${i + 1}  ${re}  ${line.trim().slice(0, 90)}`)
    })
}

if (hits.length) {
  console.error(`check-copy: ${hits.length} banned phrase(s)\n` + hits.join('\n'))
  process.exit(1)
}
console.log(`check-copy: ${files.length} files clean`)
