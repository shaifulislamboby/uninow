const crypto = require('crypto');
const DEFAULT_SIZE = 32;

// @NOTE: can use uuid module but we keep module count low for now
function generateUUID(size = DEFAULT_SIZE) {

    if (typeof size !== 'number' || Number.isNaN(size)) {
        size = DEFAULT_SIZE
    } else if (parseInt(size, 10) !== size) {
        size = parseInt(size, 10);
    }

    const uuid = crypto.randomBytes(size).toString('base64');

    return uuid;
}

exports = module.exports = generateUUID;