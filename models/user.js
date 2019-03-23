const mongoose = require('mongoose')
const log = require('debug')('server:model:user')

// params
const MAX_LOGIN_TIME = 5

/**
 * @NOTE: it would be better to use the _id field of a document,
 * as it is autogenrated, and sufficiently unique, but in our case,
 * we will do a pseudorandom userid as required by benchmark.pdf
 */
const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    unique: true,
    index: true // indexing it as we may query using it
  },
  courseName: {
    type: String,
    default: ''
  },
  loginTime: [String]
}, {
  timestamps: true,
  collection: 'users'
})

const User = mongoose.model('User', userSchema)

async function addLoginDate (userid) {
  try {
    let user = await User.findOne({ userid }).lean().exec()
    const todayString = new Date().toUTCString()

    if (user == null) {
      // when user doesn't exist create one
      user = new User({ userid, loginTime: [ todayString ] })
      await user.save()
      return
    }

    // otherwise update
    const loginTime = user.loginTime.concat([ todayString ]).slice(-MAX_LOGIN_TIME)

    // @NOTE: User.save() is not safe when doing in-memory replacements
    user = await User.findOneAndUpdate({ userid }, { $set: { loginTime } }, { new: true }).lean().exec()

    if (user == null) {
      throw new Error('Failed to update user')
    }
  } catch (err) {
    log(err.message)
    // return err to report failure
    return err
  }
}

async function addCourseName (userid, courseName) {
  try {
    await User.findOneAndUpdate({ userid }, { '$set': { courseName } }).exec()
    return null
  } catch (err) {
    log(err.message)
    return err
  }
}

exports = module.exports = {
  User,
  addLoginDate,
  addCourseName
}
