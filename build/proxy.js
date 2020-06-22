const assert = require('assert')
const request = require('request')
const PassThrough = require('stream').PassThrough
const chokidar = require('chokidar')
const { yellow } = require('chalk')
let config = require('../src/config.mock')
const { URL } = require('url')

Object.keys(config).forEach(key => {
  console.log(`> Proxy ${yellow(`${key}`)} to ${yellow(`${config[key]}`)}`)
})
console.log('\n')

// 监听config.mock文件修改
const configModule = require.cache[require.resolve('../src/config.mock')]
const watcher = chokidar.watch([configModule.filename].concat(configModule.children.map(_ => _.filename)), {
  ignored: /node_modules/,
  persistent: true
})
watcher.on('change', path => {
  delete require.cache[require.resolve('../src/config.mock')]
  try {
    config = require('../src/config.mock')
  } catch (error) {
    console.error(error)
  }
})

// 开启proxy
module.exports = async (ctx, next) => {
  let shouldProxy = false
  Object.keys(config).forEach(async (key) => {
    if (shouldProxy) return
    const keyParsed = parseKey(key)
    assert(
      typeof config[key] === 'function' ||
      typeof config[key] === 'object' ||
      typeof config[key] === 'string',
      `mock value of ${key} should be function or object or string, but got ${typeof config[key]}`
    )
    const reg = new RegExp(`^${keyParsed.path}$`)
    if (reg.test(ctx.path) && (keyParsed.method === '' ? true : keyParsed.method.toUpperCase() === ctx.method)) {
      shouldProxy = true
      if (typeof config[key] === 'string') {
        const url = reg.exec(ctx.url).length > 1 ? reg.exec(ctx.url)[1] : ctx.url
        console.log('url', url, config[key], ctx.method)
        ctx.body = ctx.req.pipe(request({
          followRedirect: false,
          uri: new URL(url, config[key]),
          method: ctx.method,
        }).on('response', (response) => {
          ctx.set(response.headers)
        })).pipe(PassThrough())
      } else if (typeof config[key] === 'function') {
        config[key](ctx)
      } else {
        ctx.type = 'json'
        ctx.body = config[key]
      }
    }
  })
  await next()
}

function parseKey (key) {
  let method = ''
  let path = key
  if (~key.indexOf(' ')) {
    const splited = key.split(' ')
    method = splited[0].toLowerCase()
    path = splited[1]
  }
  return { method, path }
}
