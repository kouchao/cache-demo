const Koa = require('koa')
const router = require('koa-router')()
const cache = require('./cache')

const app = new Koa()

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('this is data')
    }, 3000)
  })
}

const cacheMiddleware = cache()

router.get('/', async ctx => {
  ctx.body =
    '<p>访问/api/data才会发生缓存, <a href="/api/data">点击访问</a>(数据较大，3秒后有结果)</p>'
})

router.get('/api/data', cacheMiddleware, async (ctx, next) => {
  await next()
  ctx.body = await getData()
})

app.use(router.routes())

// 若不用router中间件则使用以下方法
// const cacheMiddleware = cache({urls: '/api/data'})

// app.use(cacheMiddleware)

// app.use(async (ctx, next) => {
//   if(ctx.url === '/'){
//     await next()
//     ctx.body = '<p>访问/api/data才会发生缓存, <a href="/api/data">点击访问</a>(数据较大，3秒后有结果)</p>'
//   } else if(ctx.url === '/api/data'){
//     await next()
//     ctx.body = await getData()
//   }
// })

const port = 3000
app.listen(port, () => {
  console.log(`启动服务，http://localhost:${port}`)
})
