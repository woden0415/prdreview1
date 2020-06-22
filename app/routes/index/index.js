// 脚手架
const koaRouter = require('koa-router');
const { handleSuccess, handleFail } = require('../../utils');
const { query } = require('../../db');

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
module.exports = Router;