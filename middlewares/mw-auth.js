const { verifyToken } = require('../auth');
const log = require('debug')('server:mw:verifyauthtoken');

async function verifyAuthToken(ctx, next) {
    try {
        const { authorization } = ctx.request.headers;

        // minor validation
        log(`Received auth token: ${authorization}`);
        let err = null;
        if (typeof authorization !== 'string') {
            err = new Error('An authorization token is required');
            err.code = 401;
            throw err;
        }

        if (authorization.indexOf('Bearer') !== 0) {
            // @NOTE: reference document: https://jwt.io/introduction/#How do JSON Web Tokens work?
            err = new Error('A token is expected in format Bearer <token>');
            err.code = 401;
            throw err;
        }

        const decodedToken = verifyToken(authorization.substr(6).trim());
        if (decodedToken == null) {
            err = new Error('Invalid or expired token provided');
            err.code = 401;
            throw err;
        }
        // else attach userid to request context
        ctx.state.userId = decodedToken.userId;

        // pass along alles gut
        await next();

    } catch (err) {
        log(`ERR: ${err.toString()}`);
        ctx.response.status = err.code ? err.code : 401;
        ctx.response.body = {
            message: err.code ? err.message : 'Authorization failed'
        }
    }
}

exports = module.exports = verifyAuthToken;