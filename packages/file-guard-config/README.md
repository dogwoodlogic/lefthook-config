# file-guard-config

A JS script as a git hook that can be used to prevent

- Files over a certain size from being pushed
- Files of a certain extension type from being pushed
- Files of a certain extension and size from being pushed

## Config

The following environment variables (all prefixed with `FG`) can
be added to the `.env.lefthook` to configure this hook.

|          Config         | Default | Description                                                                                                            |
|:------------------------|---------|------------------------------------------------------------------------------------------------------------------------|
| `FG_MAX_SIZE`             | '50mb'  | The maximum file size allowed by this hook                                                                             |
| `FG_MAX_SIZE_IGNORE_GLOB` | false   | Whether the file size is applied to globbed files. When this is false all staged files must be under the max file size |
| `FG_BLOCK_GLOBBED`        | false   | Flag that will block any matches to the glob pattern                                                                   |
| `FG_EXT_GLOB`             | '*'     | A glob pattern to match files against                                                                                  |