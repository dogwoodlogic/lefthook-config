# lefthook-config

A set of predefined git hooks that can be pulled into
dLinc repositories to enforce source control guidelines and policies.

## Installation

```sh
npm i -D @dlinc/lefthook-config
```

## Configuration and Usage

### Basic

After the package is installed create a `lefthook.yml` folder in the root
of the target repository. This yml will be used to configure [lefthook]()
for the repository.

Inside of this yml file, pull in one of the base configs from this package
or optionally several of the individual hooks themselves into the `extends`
heading.

> [!NOTE]  
> You must extend from the node_modules folder since lefthook
> expects a path to the yml file it is extending from

```yml
extends:
  # extend from the base config
  - node_modules/@dlinc/lefthook-config/configs/base.yml
  # pull in an individual hook
  - node_modules/@dlinc/lefthook-config/hooks/pre-commit/file-guard.yml
```

Lefthook overlays the extended configs on top of one another, allowing for
different hook configs to run the same command

### Advanced

Some of the hooks are configurable through environment variables loaded
in through dotenv. This allows for the hook to be more extensible and
support various different use cases.

These hooks expect prefix environment variables held in a `.env.lefthook`
file. One such example is the file-guard hook, which can be used prevent both
files over a certain size and of a certain extension from being pushed
to remotes.

> Prevent files over 25kb from being push

```sh
FG_MAX_SIZE="25kb"
```

> Prevent _all_ csv files, along with any file over 5mb

```sh
FG_MAX_SIZE="5mb"
FG_EXT_GLOB="*.csv"
FG_BLOCK_GLOBBED="YES"
```

Documentation for any additional configuration options for each hook
can be found in that hooks source directory under `/packages`.

### Available Configs

Configs contain bundled hooks for targeted use cases and
are available in the `/configs` directory.

```yml
extends:
  - node_modules/@dlinc/lefthook-config/configs/*
```

#### Base Config

Minimal base config

Incudes

- `@dogwoodlogic/commit-msg-config`

```yml
extends:
  - node_modules/@dlinc/lefthook-config/configs/base.yml
```

#### JS Config

Javascript oriented config

Incudes

- Base config

```yml
extends:
  - node_modules/@dlinc/lefthook-config/configs/base.yml
```

### Available Hooks

- `@dlinc/commit-msg-config`
- `@dlinc/file-guard-config`
