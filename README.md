
# 缓存中间件

## 介绍
可以缓存请求的中间件demo，分为使用koa-router和不使用两种，默认使用koa-router，不使用的方法见注释。

## 需求
访问/api/data将会缓存，/api/data的数据在每日0点会有刷新

## 分析需求
- 需要判断路由
- 需要缓存数据
- 在0点刷新

## 思路
- 判断路由
  - 匹配进入下一阶段
  - 不匹配放过
- 判断是否有缓存并且没过期
  - 有缓存并且没过期则 返回缓存
  - 无缓存或已过期 返回请求的新数据 并且放入缓存 设置过期时间为当天的23时59分59秒999毫秒

## 起步

```
npm i && node index.js
```

## 说明

可以用koa-router来匹配路由，也可以传入url
```
const cache = require('./cache')
const cacheMiddleware = cache('/api/data')
```
