#!/usr/bin/env node

import {read, write} from './lint.js';
import {hideBin} from 'yargs/helpers';
import yargs from 'yargs';

yargs(hideBin(process.argv))
  .command(['lint', '$0'], 'Lints the provided commit message',
    yargs => {
      return yargs.option('path', {
        alias: 'p',
        describe: 'Commit message path',
        type: 'string',
      });
    },
    async ({path}) => {
      const content = await read({path});
      let {msg} = content;
      const {rest} = content;
      msg = msg.trim();
      msg = `${msg.charAt(0).toUpperCase()}${msg.slice(1)}`;
      if(!msg.endsWith('.')) {
        console.warn(
          'No period found at end of commit message, inserting one.'
        );
        msg = `${msg}.`;
      }

      if(msg.length > 80) {
        console.error('Commit message must be less than 80 chars');
        process.exit(1);
      }
      rest.unshift(msg);
      return write({path, contents: rest.join('')});
    }
  )
  .fail((msg, err) => {
    console.error(msg, err);
    process.exit(1);
  })
  .parseAsync();
