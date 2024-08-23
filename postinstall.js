#!/usr/bin/env node

import { readdir, symlink } from 'fs/promises'
import { resolve } from 'path'

const packages = (await readdir('packages', { withFileTypes: true }))
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

for (const _package of packages) {
  symlink(
    resolve(process.cwd(), 'node_modules/@dogwoodlogic/lefthook-config/packages', _package), 
    resolve(process.cwd(), 'node_modules/@dogwoodlogic/', _package), 
  )
}