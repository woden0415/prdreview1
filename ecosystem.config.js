// ecosystem.config.js pm2启动配置文件
module.exports = {
  apps: [{
    // 开发环境
    name: "dev-app",
    script: "./main.js",
    cwd: "app",
    env: {
      "NODE_ENV": "development",
      "PORT": 9079
    },
    watch: true,
    ignore_watch: [
      "node_modules",
      "app/logs",
      "src"
  ]
  }, {
    // 测试环境
    name: "test-implant",
    script: "dist/main.js",
    env: {
      "NODE_ENV": "test",
      "PORT": 9079
    }
  }]
}
