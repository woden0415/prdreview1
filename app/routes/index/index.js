// 脚手架
const koaRouter = require('koa-router');
const { handleSuccess, handleFail, getService } = require('../../utils');
const { query } = require('../../db');
const koaBody = require("koa-body");
const fs = require('fs');
const path = require('path');
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

    const fileLists = ctx.request.files.fileLists;
    let rootPath = '';

    fileLists.forEach(async (file) => {
      const filePathName = decodeURIComponent(file.name);
      const fileResourcePath = file.path;
      rootPath = urlFormat(filePathName).rootPath;

      const { filePath, fileName } = urlFormat(filePathName);
      // 创建根目录链
      const targetFolderPath = `${path.resolve(__dirname, '../../www/assets/previewprd')}/${filePath}/`;

      let isExitFolder = await getStat(targetFolderPath);
      if (!isExitFolder) {
        fs.mkdirSync(targetFolderPath, { recursive: true }); // 创建目录
      }
      const readStream = fs.createReadStream(fileResourcePath);
      writeStream = fs.createWriteStream(`${targetFolderPath}/${fileName}`);
      readStream.pipe(writeStream);
    });

    // 返回线上地址
    const Path = `/www/assets/previewprd/${rootPath}/index.html`
    const prdUrl = `${getService()}${Path}`;
    ctx.body = handleSuccess({
      prdUrl
    });
  } else {
    ctx.body = handleFail({
      message: '上传失败'
    });
  }
});

// 格式化filename得到对应的值
/**
 * @description 得到文件路径的对应值
 * @param {*} url "book/book1/算法+101-JavaScript+描述（V1.0.0）.pdf";
 * @returns {Object} {rootPath: 'book', filePath: 'book/book1', fileName: '算法+101-JavaScript+描述（V1.0.0）.pdf'}
 */
function urlFormat(url) {
  let arrTmp = url.split('/');
  const rootPath = arrTmp[0];
  const fileName = arrTmp.pop();
  const filePath = arrTmp.join('/')
  return {
    rootPath,
    filePath,
    fileName
  }
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    })
  })
}

module.exports = Router;