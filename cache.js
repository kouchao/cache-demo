const dayjs = require('dayjs')

let cacheStore = {}

module.exports = urls => async (ctx, next) => {
  const now = dayjs().valueOf()

  // 类型检查
  if(urls && typeof urls !== 'string'){
    console.error('urls必须是一个数组或字符串')
    urls = ''
  }

  // 如果urls存在 并且 不是数组
  if(urls && Array.isArray(urls)){
    urls = [urls]
  }

  const isMatching = urls ? urls.some(url => url === ctx.url) : true

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