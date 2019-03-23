const { addLoginDate } = require('../models/user')
const log = require('debug')('server:ctrl:createorlogin')

const generateUID = require('../utils/generate-uid')
const { generateNewToken } = require('../auth/')

async function createOrLogin (userid) {
  try {
    if (typeof userid !== 'string' || userid.length <= 0) {
      userid = generateUID()
    }

    const token = generateNewToken(userid)
    const err = await addLoginDate(userid)

    if (err != null) {
      throw err
    }

    return token
  } catch (err) {
    log(err.message)
    return null
  }
}

exports = module.exports = createOrLogin
