const CronJob = require('cron').CronJob

let cacheStore = {}

module.exports = (conf = {}) => async (ctx, next) => {

  let { urls, cronTime = '0 0 0 * * * *' } = conf
  // 定时任务
  new CronJob(cronTime, function() {
    cacheStore = {}
  }, null, true, 'America/Los_Angeles')

  // 类型检查
  if (urls && typeof urls !== 'string' && !Array.isArray(urls)) {
    console.error('urls必须是一个数组或字符串')
    urls = ''
  }

  // 如果urls存在 并且 不是数组
  if (urls && !Array.isArray(urls)) {
    urls = [urls]
  }


  const isMatching = urls ? urls.some(url => url === ctx.url) : true

  // 是否匹配路由
  if (!isMatching) {
    await next()
    return
  }

  const cache = cacheStore[ctx.url]

  // 未缓存
  if (cache) {
    ctx.body = cache.data
  } else {
    await next()

    const data = ctx.body

    // 缓存数据
    cacheStore[ctx.url] = data
  }
}
