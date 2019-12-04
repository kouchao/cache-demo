# 缓存中间件

## 介绍

可以缓存请求的中间件 demo，分为使用 koa-router 和不使用两种，默认使用 koa-router，不使用的方法见注释。

## 需求

访问/api/data 将会缓存，/api/data 的数据在每日 0 点会有刷新

## 分析需求

- 需要判断路由
- 需要缓存数据
- 在 0 点刷新

## 思路

- 定时任务 每日0点清空缓存
- 判断路由
  - 匹配进入下一阶段
  - 不匹配放过
- 判断是否有缓存并且没过期
  - 有缓存 返回缓存
  - 无缓存 返回请求的新数据 并且放入缓存

## 文档

### 运行

```
npm i && node index.js
```

### 起步

可以用 koa-router 来匹配路由，也可以传入 url

```
const cache = require('./cache')
const cacheMiddleware = cache({urls: '/api/data'}) // 可以使数组['/api/data']
```

### 参数

| 参数 | 介绍 | 类型 | 默认值  |
| - | - | - | - |
| urls | 要缓存的接口地址 | `string` / `array` | `null` |
| cronTime | cron 风格表达式 [参考](https://blog.csdn.net/shouldnotappearcalm/article/details/89469047) | `string` | `'0 0 0 * * ? *'` (每日 0 点) |
