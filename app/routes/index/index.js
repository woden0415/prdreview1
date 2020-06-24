// 脚手架
const koaRouter = require('koa-router');
const { handleSuccess, handleFail } = require('../../utils');
const { query } = require('../../db');
const koaBody = require("koa-body");
const fs = require('fs');

let Router = koaRouter();

Router.get('/get', async (ctx) => {
  let param = ctx.query || ctx.params;
  let sql = ' where 1=1'
  let datas = await query('SELECT * FROM demo' + sql);

  ctx.body = handleSuccess({
    data: datas,
    total: datas.length
  });
});
Router.get('/getTestJson', async (ctx) => {
  try {
    const text = fs.readFileSync(__dirname + "/bejson.json", { encoding: 'utf8' });
    console.log(text);
    ctx.body = handleSuccess({
      data: text,
    });
  } catch (error) {
    ctx.body = handleSuccess({
      data: JSON.stringify(error),
    });
  }
});
Router.post('/upload', koaBody(), (ctx) => {

  console.log('ctx.request.files :>> ', ctx.request.files.file);
  ctx.body = handleSuccess({
    data: JSON.stringify(ctx.request.body),
  });
});
module.exports = Router;