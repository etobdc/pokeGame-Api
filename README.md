# PokeGame

A system to manage the WebApp PokeGame.

## Install
For this project you'll need to have [docker](https://www.docker.com/) in your computer.

## Start
To start the server just run:
```
docker-compose up
```

## Development
If you need to run migrations and seeders just run:
```
docker exec --it <container> npm run migrate
docker exec --it <container> npm run seeder
```

You can use knex`s commands by running
```
docker exec --it <container> npm run knex <commands>
```

To use the linter run:
```
npm run linter
```
