# Uninow Test Repo

---

This is a repository for test from uninow.

# How To

### Requirements:

To run this codebase, following are needed:
- NodeJS 8.0+
- Redis 4.0+
- MongoDB 4.0+

### Preparation

First clone the repository using
```
$ git clone https://github.com/shaifulislamboby/uninow.git
```
Then setup MongoDB and Redis.

Edit the `/config/development.json` or `/config/production.json` to connection information for mongo and redis.
Refer to `/config/default.json` for reference(default) configuration example.

Then install all dependencies using
```
$ npm install
```
### Starting

Finally to start use one of the following
```
# start in development mode
$ npm run start:dev

# start in production mode
$ npm run start
```

### Using Docker

If docker and docker-compose is available, to start the service run
```
# build the node image
$ docker-compose build

# boot
$ docker-compose up

# or boot in daemon mode
$docker-compose up -d 
```

### Testing
(coming soon)

---

### Todos:

- [ ] add tests
- [ ] refactor
- [ ] organize things properly
- [ ] add more comprehensive comments