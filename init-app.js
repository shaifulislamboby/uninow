const config = require('config')
const mongoose = require('mongoose')
const Redis = require('ioredis')

const router = require('./routes')
const middlwares = require('./middlewares')

const log = require('debug')('server:init')

/**
 * We initiate server here
 * When called, a connection to db(mongo) and cache(redis) is made before configuring the application
 * @param app - {Koa} - app to init
 * @returns {Promise<void>}
 */
async function initApp (app) {
  // connect to db
  const mongoURL = `${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`
  await mongoose.connect(mongoURL, { useNewUrlParser: true })
  log(`Mongodb connected.`)

  // connect to redis
  const redis = new Redis({
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    db: config.get('redis.db')
  })
  log(`Redis connected`)

  // pass redis connection reference down to controllers
  app.context.redis = redis

  // attach middleware
  app.use(middlwares.logResponseTime)

  // attach routes
  app.use(router.routes()).use(router.allowedMethods())
}

exports = module.exports = initApp
