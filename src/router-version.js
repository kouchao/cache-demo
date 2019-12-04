// 使用router中间件的版本
const router = require('koa-router')()
const getData = require('./service')

module.exports = function(app, createCacheMiddleware) {

  console.log('当前运行的是使用router中间件的版本')
  const cacheMiddleware = createCacheMiddleware()

  router.get('/', async ctx => {
    ctx.body =
      '<p>访问/api/data才会发生缓存, <a href="/api/data">点击访问</a>(数据较大，3秒后有结果)</p>'
  })

  router.get('/api/data', cacheMiddleware, async (ctx, next) => {
    await next()
    ctx.body = await getData()
  })

  app.use(router.routes())
}
