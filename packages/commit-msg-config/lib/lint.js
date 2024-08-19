import {createInterface} from 'node:readline';
import {createReadStream} from 'node:fs';
import {writeFile} from 'node:fs/promises';

export async function read({path}) {
  const inputStream = createReadStream(path);
  const lines = [];
  for await (const line of createInterface(inputStream)) {
    lines.push(line);
  }
  inputStream.destroy();
  return {msg: lines.shift(), rest: lines};
}

export async function write({path, contents}) {
  return writeFile(path, contents);
}
