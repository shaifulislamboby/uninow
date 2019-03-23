const Koa = require('koa');
const config = require('config');
const log = require('debug')('server:app');

const init = require('./init-app');

// init app
const app = new Koa();

async function boot() {
    try {

        // init app
        await init(app);

        const PORT = config.get('server.port');
        app.listen(PORT, () => log(`Server bound to port: ${PORT}`));

    } catch(err) {
        log(`Server initialisation failed - ${err.stack.toString()}`);
        process.exit(1);
    }
}

boot();
