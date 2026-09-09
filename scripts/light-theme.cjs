/**
 * Dark -> Light theme token mapper.
 * Rules:
 *  - Lines containing `bg-honda-red` are skipped entirely (white text on red stays).
 *  - Ordered longest-first so `/opacity` variants are handled before bare tokens.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const DIRS = ['src/pages', 'src/components']
const SKIP = new Set(['Navbar.jsx', 'Preloader.jsx'])

const MAP = [
  ['bg-carbon-950/80', 'bg-white/90'],
  ['bg-carbon-900/70', 'bg-carbon-50'],
  ['bg-carbon-900/50', 'bg-carbon-100/70'],
  ['bg-carbon-900/80', 'bg-white/90'],
  ['bg-carbon-800/70', 'bg-white'],
  ['bg-carbon-800/60', 'bg-white'],
  ['bg-carbon-900', 'bg-carbon-100'],
  ['bg-carbon-800', 'bg-white'],
  ['bg-carbon-700/50', 'bg-carbon-100'],
  ['bg-carbon-700', 'bg-carbon-100'],
  ['bg-carbon-950', 'bg-white'],
  ['from-carbon-950', 'from-white'],
  ['from-carbon-700', 'from-carbon-50'],
  ['to-carbon-900', 'to-carbon-100'],
  ['border-white/5', 'border-carbon-900/10'],
  ['border-white/10', 'border-carbon-900/10'],
  ['border-white/15', 'border-carbon-900/15'],
  ['border-white/20', 'border-carbon-900/20'],
  ['hover:bg-white/5', 'hover:bg-carbon-900/5'],
  ['bg-white/10', 'bg-carbon-900/10'],
  ['bg-white/5', 'bg-carbon-900/5'],
  ['text-white/85', 'text-carbon-800'],
  ['text-white/80', 'text-carbon-800'],
  ['text-white/75', 'text-carbon-800'],
  ['text-white/70', 'text-carbon-700'],
  ['text-white/65', 'text-carbon-700'],
  ['text-white/60', 'text-carbon-600'],
  ['text-white/55', 'text-carbon-500'],
  ['text-white/50', 'text-carbon-500'],
  ['text-white/45', 'text-carbon-500'],
  ['text-white/40', 'text-carbon-400'],
  ['text-white/35', 'text-carbon-400'],
  ['text-white/30', 'text-carbon-400'],
  ['text-white/90', 'text-carbon-900'],
  ['hover:text-white', 'hover:text-carbon-900'],
  ['group-hover:text-white', 'group-hover:text-carbon-900'],
  ['text-white', 'text-carbon-900'],
]

const processed = []
for (const dir of DIRS) {
  const abs = path.join(ROOT, dir)
  for (const file of fs.readdirSync(abs)) {
    if (!file.endsWith('.jsx') || SKIP.has(file)) continue
    const filePath = path.join(abs, file)
    const out = fs
      .readFileSync(filePath, 'utf8')
      .split('\n')
      .map((line) => {
        if (line.includes('bg-honda-red')) return line
        let l = line
        for (const [from, to] of MAP) l = l.split(from).join(to)
        return l
      })
      .join('\n')
    fs.writeFileSync(filePath, out)
    processed.push(file)
  }
}
console.log('Processed files:\n' + processed.join('\n'))
