<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# development with watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Husky

For first time

```bash
# add next command into package.json
pnpm exec husky init
```

__Add commands into .husky folder:__

pre-commmit
```bash
# copy this into .husky/pre-commmit

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged

```

commit-msg
```bash
# copy this into .husky/pre-commmit

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}

```

## Migrations

Create a migration

```bash
$ npm run migrate:create <path>
$ yarn migrate:create <path>

# example
$ npm run migrate:create src/migrations/migration_name
$ yarn migrate:create src/migrations/migration_name
```

Generate a migration

```bash
$ npm run migrate:g <path>
$ yarn migrate:g <path>

# example
$ npm run migrate:g src/migrations/migration_name
$ yarn migrate:g src/migrations/migration_name

```

Run a migration

```bash
$ npm run migrate:run
$ yarn migrate:run
```

Revert a migration

```bash
$ npm run migrate:rollback
$ yarn migrate:rollback
```

Migrations scripts with yarn

```bash
"typeorm": "ts-node ./node_modules/typeorm/cli",
"migrate:create": "yarn typeorm migration:create",
"migrate:g": "yarn typeorm -d ./src/config/data.source.ts migration:generate",
"migrate:run": "yarn typeorm migration:run -d ./src/config/data.source.ts",
"migrate:rollback": "yarn typeorm -d ./src/config/data.source.ts migration:revert"
```

Migrations scripts with npm

```bash
"typeorm": "ts-node ./node_modules/typeorm/cli",
"migrate:create": "npm run typeorm -- migration:create",
"migrate:g": "npm run typeorm -- -d ./src/config/data.source.ts migration:generate",
"migrate:run": "npm run typeorm migration:run -- -d ./src/config/data.source.ts",
"migrate:rollback": "npm run typeorm -- -d ./src/config/data.source.ts migration:revert"
```

## Recommendations

- To install ts-node globally

```bash
$ npm install -g ts-node
```

- Copy migrations scripts into the package.
