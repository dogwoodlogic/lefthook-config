#!/usr/bin/env node

import {readdir, symlink} from 'node:fs/promises';
import {resolve} from 'node:path';

const packages = (await readdir('packages', {withFileTypes: true}))
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const cwd = process.env.INIT_CWD ?? process.cwd();

console.log(`Current directory: ${cwd}`);

for(const _package of packages) {
  try {
    await symlink(
      // eslint-disable-next-line max-len
      resolve(cwd, 'node_modules/@dogwoodlogic/lefthook-config/packages', _package),
      resolve(cwd, 'node_modules/@dogwoodlogic/', _package),
    );
  } catch(error) {
    console.log('Symlink exists already');
  }
}
