<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

API creating communication between front & database  
Using [Nest](https://github.com/nestjs/nest) framework with TypeORM

## Installation

```bash
$ pnpm i
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## TypeORM

```bash
# Generate new migration with model changes
npm run migration:add --name=migrationName

# Run migrations
npm run migration:run

# Revert the latest migration
npm run migration:revert

# Create empty migration
npm run migration:create --name=migrationName
```

## More

>Swagger available on [http://localhost:3000/swagger](http://localhost:3000/swagger)

>Import entities from database with TypeORM model generator  
`npx typeorm-model-generator -h localhost -d plannerbox -u postgres -x postgres -e postgres -o .\src\infrastructure\ -s public`

## License

Nest is [MIT licensed](LICENSE).
