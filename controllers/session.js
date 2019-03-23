const { User, addLoginDate } = require('../models/user');
const log = require('debug')('server:ctrl:createorlogin');

const generateUID = require('../utils/generate-uid');
const { generateNewToken } = require('../auth/');
const MAX_LOGIN_TIME_COUNT = 5;

async function createOrLogin(userid) {
    try {

        if (typeof userid !== 'string' || userid.length <= 0) {
            userid = generateUID();
        }

        const token = generateNewToken(userid);
        const err = await addLoginDate(userid);

        if (err != null) {
            throw err;
        }

        return token;

    } catch(err) {
        log(err.message);
        return null;
    }
}

exports = module.exports = createOrLogin;