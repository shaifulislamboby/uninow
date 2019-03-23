const log = require('debug')('server:mw:logresponsetime')
/**
 * This middleware is used to log request/response time on console
 */
async function logResponseTime (ctx, next) {
  try {
    // store start time
    const requestStartTimestamp = Date.now()

    // let other middlewares complete
    await next()

    // measure total time (ms)
    const responseTime = Date.now() - requestStartTimestamp
    console.log(`Response Time: ${responseTime} ms - Path: ${ctx.url} - Method: ${ctx.method}`)
  } catch (err) {
    log(`ERR: ${err.stack.toString()}`)
  }
}

exports = module.exports = logResponseTime
