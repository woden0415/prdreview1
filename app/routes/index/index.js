// 脚手架
const koaRouter = require('koa-router');
const { handleSuccess, handleFail } = require('../../utils');
const { query } = require('../../db');
const koaBody = require("koa-body");
const fs = require('fs');
const compressing = require('compressing');
const path = require('path');
// const extract = require('extract-zip')
// const decompress = require('decompress')
// const zlib = require('zlib')
// const zlib = require('zlib')
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
  if (ctx.request.files.file) {

    // @todo 根据文件名创建对应的目录，并给出回调事件
    // @todo 通过compressing.zip.uncompress(reader, filePath)方法将文件写入
    // @todo 找到对应的index.html文件，返回路径


    const reader = fs.createReadStream(ctx.request.files['file']['path']);
    let filePath = `${path.resolve(__dirname, '../../www/assets')}/ddmccdn/`;
    // let sourcePath = `${ctx.request.files['file']['path']}`
    let sourcePath = `${__dirname}/PRD.zip`
    console.log('filePath :>> ', filePath);
    console.log('sourcePath :>> ', sourcePath);
    compressing.zip.uncompress(reader, filePath)
      .then(((res) => {
        console.log(res);
        ctx.body = handleSuccess({
          data: ctx.request.files['file']['name'],
        });
      }))
      .catch((error) => {
        console.error(error);
        ctx.body = handleSuccess({
          data: '上传失败',
        });
      })











  } else {
    ctx.body = handleSuccess({
      data: '上传失败',
    });
  }
});
module.exports = Router;