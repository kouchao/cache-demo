// 不使用router中间件的版本
const getData = require('./service')

module.exports = function(app, createCacheMiddleware) {
  
  console.log('当前运行的是不使用router中间件的版本')

  const cacheMiddleware = createCacheMiddleware({ urls: '/api/data' })

  app.use(cacheMiddleware)

  app.use(async (ctx, next) => {
    if(ctx.url === '/'){
      await next()
      ctx.body = '<p>访问/api/data才会发生缓存, <a href="/api/data">点击访问</a>(数据较大，3秒后有结果)</p>'
    } else if(ctx.url === '/api/data'){
      await next()
      ctx.body = await getData()
    }
  })
}