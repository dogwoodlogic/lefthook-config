#!/usr/bin/env node

import {hideBin} from 'yargs/helpers';
import {validate} from './validate.js';
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
      return validate({paths: staged});
    }
  )
  .fail((msg, err) => {
    if(msg) {
      console.error(msg);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  })
  .parseAsync();
