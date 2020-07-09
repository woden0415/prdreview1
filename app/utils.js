const CONSTS = require('./consts')

const port = CONSTS.port.dev;


function getIPAdress() {
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
function handleSuccess(data, message) {
  return {
    success: true,
    message,
    data
  };
}
function handleFail(data, message, code) {
  return {
    success: false,
    message,
    data: data || '',
    code: code || '4004'
  };
}
/**
 * @description 获取当前服务地址（包括端口）
 */
function getService() {
  return `http://${getIPAdress()}:${port}`
}

module.exports = {
  handleSuccess,
  handleFail,
  getIPAdress,
  getService,
}