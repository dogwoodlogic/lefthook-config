#!/usr/bin/env node

import {hideBin} from 'yargs/helpers';
import yargs from 'yargs';

yargs(hideBin(process.argv))
  .command(['validate', '$0'], 'Lints the provided commit message',
    yargs => {
      return yargs.option('staged', {
        alias: 's',
        describe: 'Staged file paths',
        type: 'array',
      });
    },
    async ({staged}) => {
      console.log(staged);
    }
  )
  .fail((msg, err) => {
    console.error(msg, err);
    process.exit(1);
  })
  .parseAsync();
