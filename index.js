const Koa = require('koa')
const createCacheMiddleware = require('./src/cache')

const useRouterVersion = require('./src/router-version') 
const useNoRouterVersion = require('./src/no-router-version') 

const app = new Koa()

useRouterVersion(app, createCacheMiddleware)
// useNoRouterVersion(app, createCacheMiddleware)

const port = 3000
app.listen(port, () => {
  console.log(`启动服务，http://localhost:${port}`)
})
