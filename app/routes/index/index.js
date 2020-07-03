// 脚手架
const koaRouter = require('koa-router');
const { handleSuccess, handleFail } = require('../../utils');
const { query } = require('../../db');
const koaBody = require("koa-body");
const fs = require('fs');
const path = require('path');
// const compressing = require('compressing');
const unzipStream = require('unzip-stream1');
const iconvLite = require('iconv-lite');
const CONSTS = require('../../consts')
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
    const text = fs.readFileSync(__dirname + "../www/assets/bejson.json", { encoding: 'utf8' });
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
  if (ctx.request.files) {
    // 根据文件名创建对应的目录
    // 通过compressing.zip.uncompress(reader, filePath)方法将文件写入
    // 找到对应的index.html文件，返回路径
    const fileInstance = ctx.request.files.files;
    const folderNameOrigin = fileInstance.name.split('.')[0];
    const folderName = fileInstance.name.split('.')[0] + new Date().getTime();
    const sourcePath = fileInstance.path;
    const targetFolderPath = `${path.resolve(__dirname, '../../www/assets/previewprd')}/${folderName}/`;

    // 将流文件写入到本地
    const copyReaderStream = fs.createReadStream(sourcePath);
    fs.mkdirSync(targetFolderPath, { recursive: true }); // 创建目录

    copyReaderStream
      .pipe(unzipStream.Extract({
        path: targetFolderPath,
        decodeString: (buffer) => { return iconvLite.decode(buffer, 'utf8'); },
      }));

    // 返回线上地址
    const port = CONSTS.port.dev;
    const host = 'http://127.0.0.1';
    const Path = `/www/assets/previewprd/${folderName}/${folderNameOrigin}/index.html`
    const prdUrl = `${host}:${port}${Path}`;
    ctx.body = handleSuccess({
      prdUrl
    });
  } else {
    ctx.body = handleFail({
      message: '上传失败'
    });
  }
});
module.exports = Router;