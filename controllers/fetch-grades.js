const log = require('debug')('server:ctrl:fetchandshowgrades')
const config = require('config')
const getGrades = require('../parser/fetch-parse')
const { addCourseName } = require('../models/user')
async function fetchAndSaveGrades (userid, redis) {
  try {
    // check in redis first
    const dataStr = await redis.get(userid)

    if (dataStr != null) {
      log(`Cache Hit: Fetched from Redis`)
      return JSON.parse(dataStr)
    }

    const parsedData = await getGrades()
    if (parsedData != null) {
      await addCourseName(userid, parsedData.name)
      // store in redis with expiry time
      redis.set(userid, JSON.stringify(parsedData), 'EX', config.get('redis.ttlInSec'))
    }

    return parsedData
  } catch (err) {
    log(`ERR_FETCHNSHOW: ${err.stack.toString()}`)
    return null
  }
}

exports = module.exports = fetchAndSaveGrades
