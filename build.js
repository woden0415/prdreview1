const { cp } = require('shelljs')

// opm node-service类型项目部署时，会以dist目录在的main.js作为node入口文件
cp('-R', 'app/', 'dist/');
