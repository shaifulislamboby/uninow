const Router = require('koa-router')
const { auth: mwAuth } = require('../middlewares')
const router = new Router()
const createOrLogin = require('../controllers/session')
const fetchGrades = require('../controllers/fetch-grades')

router.get('/', async (ctx, next) => {
  ctx.response.body = {
    message: 'Hello World!'
  }
})

router.post('/session/create', async (ctx, next) => {
  console.log(`DATA: ${JSON.stringify(ctx.query, null, 2)}`)

  const { userid } = ctx.query

  // validate
  if (userid != null && typeof userid !== 'string') {
    ctx.response.status = 422
    ctx.response.body = {
      message: 'userid should be a valid base64 encoded string'
    }
    return
  }

  const authToken = await createOrLogin(userid)

  if (authToken == null) {
    ctx.response.status = 500
    return
  }
  ctx.response.body = {
    message: 'Authorization token generated successfully',
    token: authToken
  }
})

router.post('/grades/fetch', mwAuth, async (ctx, next) => {
  const gradeData = await fetchGrades(ctx.state.userid, ctx.redis)
  if (gradeData == null) {
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Failed to fetch grades. Please try again later'
    }
    return
  }

  ctx.response.body = gradeData
})

exports = module.exports = router
