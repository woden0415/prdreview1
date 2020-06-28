// 脚手架
const koaRouter = require('koa-router');
const { handleSuccess, handleFail } = require('../../utils');
const { query } = require('../../db');
const koaBody = require("koa-body");
const fs = require('fs');
const path = require('path');
// const extract = require('extract-zip')
// const decompress = require('decompress')
// const zlib = require('zlib')
// const zlib = require('zlib')
const compressing = require('compressing');
const unzipStream = require('unzip-stream');
const iconvLite = require('iconv-lite');

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
  if (ctx.request.files.file) {
    // @todo 根据文件名创建对应的目录，并给出回调事件
    // @todo 通过compressing.zip.uncompress(reader, filePath)方法将文件写入
    // @todo 找到对应的index.html文件，返回路径
    const fileInstance = ctx.request.files.file;
    const folderName = fileInstance.name.split('.')[0] + new Date().getTime();
    const fileName = fileInstance.name;
    const sourcePath = fileInstance.path;
    const targetFolderPath = `${path.resolve(__dirname, '../../www/assets/previewprd')}/${folderName}/`;
    // const copyFilePath = `${path.resolve(__dirname, '../../www/assets/previewprd')}/${folderName}/${fileName}`;

    // 将流文件写入到本地
    const copyReaderStream = fs.createReadStream(sourcePath);
    fs.mkdirSync(targetFolderPath, { recursive: true }); // 创建目录
    // const copyWriteStream = fs.createWriteStream(copyFilePath)


    copyReaderStream
      // .pipe(copyWriteStream)
      .pipe(unzipStream.Extract({
        path: targetFolderPath,
        decodeString: (buffer) => { return iconvLite.decode(buffer, 'UTF-8'); },
      }));

    ctx.body = handleSuccess({
      data: ctx.request.files['file']['name'],
    });
  } else {
    ctx.body = handleSuccess({
      data: '上传失败',
    });
  }
});
module.exports = Router;