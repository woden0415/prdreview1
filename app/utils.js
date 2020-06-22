module.exports = {
  handleSuccess(data, message) {
    return {
      success: true,
      message,
      data
    };
  },
  handleFail(data, message, code) {
    return {
      success: false,
      message,
      data: data || '',
      code: code || '4004'
    };
  },
  getIPAdress () {
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
}