# BHack Backend

## Install & Run (Dockerized)

### Requirements

- Docker
- Node >v18.0.0

### Setup

Create a '.docker.env' file in the root directory of the project, following the example in the '.env.example' file.

Notes - the ports exposed to the local machine (example):

```env
FORWARD_APP_PORT=3000
FORWARD_REDIS_PORT=6379
FORWARD_DB_PORT=3306
```

The port that you use to connect to the api (in this example) is FORWARD_APP_PORT.

### Commands

1. `npm i` - Install dependencies
2. `npx prisma generate` - Generate Prisma Client
3. `npm run build` - Build the project
4. `docker-compose build --no-cache` - Build the docker images
5. `docker-compose -f docker-compose.yml up -d` - Run the project

## Notes

To run the project in a docker container, you will need to have docker and docker-compose installed. The docker-compose.yml file will run the application, postgres, and redis.

Ensure that the configuration in the .env file is correct for the docker environment.

To run the project in docker, run the following commands:

```bash
docker-compose -f docker-compose.yml up -d    
```

To rebuild the docker image, run the following commands:

```bash
docker-compose -f docker-compose.yml down
```

```bash
docker-compose build --no-cache 
```

**One important note related to the migrations**: The migrations will not run in dev mode (`npx prisma migrate dev`) if the user does not have the correct permissions. To run the migrations, you will need to run the following command, to assign the permissions to the user (in the terminal of the database container):

```bash
mysql -uroot -p
```

```mysql
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO ${DB_USER};
```
