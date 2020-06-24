"use strict";

const Koa = require("koa");
const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const koaConvert = require("koa-convert");
const koaCors = require("koa2-cors");
// const session = require('koa-session');
const chalk = require('chalk');
const koaStatic = require('koa-static2');
const path = require('path');
// const { accessLogger, errLogger } = require("./logs/logger");
const { getIPAdress, handleFail } = require('./utils');

const CONSTS = require('./consts')

const app = new Koa();

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

// 全局错误捕获
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 响应
    ctx.body = handleFail(error, '服务器异常', 500);
    ctx.app.emit('error', error); // 触发应用层级错误事件
  }
});
// 路由
const api = koaRouter()
  .use("/api", require("./routes/index/index").routes())
  .get("/status", ctx => {
    ctx.body = "SUCCESS";
  })
  .get("/", ctx => {
    ctx.body = "welcome node.js";
  })
  .get("/nginx-status", ctx => {
    ctx.body = "SUCCESS";
  });

// 中间件
app
  // .use(accessLogger())
  // .use(koaConvert(koaBody()))
  .use(
    koaCors({
      origin: ctx => {
        return ctx.request.header.origin;
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 5,
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
  )
  .use(api.routes())
  .use(api.allowedMethods())
  .use(koaStatic('www', path.join(__dirname, 'www')))



const PORT = CONSTS.port.dev;
app.listen(PORT);
console.log(`env: ${process.env.NODE_ENV}`);
console.log(`\n> Nodejs Listening at ${chalk.cyan(`http://127.0.0.1:${PORT}`)}`)
console.log(`> Nodejs Listening at ${chalk.red(`http://${getIPAdress()}:${PORT}`)}\n`)

module.exports = app;
