import {has, merge, pick} from 'lodash-es';
import {boolean} from 'boolean';
import clean from 'omit-empty';
import {config} from './configs.js';
import match from 'micromatch';
import {parse} from 'bytes';
import {resolve} from 'node:path';
import {stat} from 'node:fs/promises';

export async function validate({paths}) {
  const {
    FG_MAX_SIZE: max,
    FG_MAX_SIZE_IGNORE_GLOB: ignoreGlob,
    FG_BLOCK_GLOBBED: block,
    FG_EXT_GLOB: glob
  } = getConfig();

  const matched = match(paths, glob);
  if(block && matched.length > 0) {
    throw new Error('Staged files have been blocked');
  }
  if(!ignoreGlob) {
    paths = matched;
  }
  const maxByteSize = parse(max);
  for(const path of paths) {
    const abs = resolve(process.cwd(), path);
    const {size} = await stat(abs);
    if(size > maxByteSize) {
      throw new Error(
        `Staged file "${path}" is over max allowable size of ${max}`
      );
    }
  }
}

export function getConfig() {
  // pick any config values out of the environment
  const env = clean(pick(process.env, Object.keys(config)));
  // TODO: Use zod to clean and cast these as needed
  // dotenv parses all values as strings so cast booleans as needed
  if(has(env, 'FG_BLOCK_GLOBBED')) {
    env.FG_BLOCK_GLOBBED = boolean(env.FG_BLOCK_GLOBBED);
  }
  if(has(env, 'FG_MAX_SIZE_IGNORE_GLOB')) {
    env.FG_MAX_SIZE_IGNORE_GLOB = boolean(env.FG_MAX_SIZE_IGNORE_GLOB);
  }
  // merge the picked values over the default configs and return
  return merge(config, env);
}
