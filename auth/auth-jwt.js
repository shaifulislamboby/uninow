const jwt = require('jsonwebtoken');
const config = require('config');
const log = require('debug')('server:auth:jwt');

// common config
const JWT_CONFIG = {
    algorithm: config.get('jwtConfig.algorithm'),
    expiresIn: config.get('jwtConfig.expiresInSec'),
    audience: 'user',
    issuer: `${config.get('server.host')}`
};

function generateNewToken(userId) {
    try {
        const jwtContent = {
            userId: userId
        };

        const token = jwt.sign(jwtContent, config.get('jwtConfig.privateKey'), JWT_CONFIG);

        log(`Generated Token: ${ token }`);

        return token;

    } catch (err) {
        log(`ERR_GENERATE: ${err.stack.toString()}`);
        return null;
    }
}

function verifyToken(jwtToken) {
    try {

        const decodedToken = jwt.verify(jwtToken, config.get('jwtConfig.privateKey'), JWT_CONFIG);
        log(`Decoded Token: ${JSON.stringify(decodedToken,null, 2)}`);
        return decodedToken;


    } catch (err) {
        log(`ERR_VERIFY: ${err.toString()}`);
        return null;
    }
}

exports = module.exports = {
    generateNewToken,
    verifyToken
}