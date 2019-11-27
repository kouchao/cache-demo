const dayjs = require('dayjs')

let cacheStore = {}

module.exports = (url) => async (ctx, next) => {
  const now = dayjs().valueOf()

  const isMatching = url ? url === ctx.url : true

  // 是否匹配路由
  if(!isMatching){
    await next()
    return 
  }

  const cache = cacheStore[ctx.url]

  // 未缓存或者已过期
  if(cache && now < cache.expirationDate){
    ctx.body = cache.data
  } else {
    await next()

    const data = ctx.body
    const expirationDate = dayjs().endOf('day').valueOf()

    // 缓存数据
    cacheStore[ctx.url] = {
      data,
      expirationDate
    }
  }
}