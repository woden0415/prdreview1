node脚手架 (前端react+ts, 后端koa)
- 前端 react+ts
- 后端 koa+mysql


## 
> /app 文件夹为node项目

## 启动
``` bash
    // 前端
    npm i 
    npm run dev [port]

    // 后端
    sudo npm i -g pm2 // 全局安装pm2
    
    mysql.server start // 确保本地数据库开启
    
    // 导入测试数据数据库
    1.新建连结mysql
    2.导入app/demo.sql
    
    // 启动node服务
    npm run server
    // 接口访问 http://127.0.0.1:9079/api/get
    // 静态资源访问 http://127.0.0.1:9079/www/index.html
    pm2 logs // 打开日志
```

## 构建
```bash
  npm run build
```


### pm2常用命令
1. pm2 start 启动
2. pm2 restart 重新启动
3. pm2 list 查看启动列表
4. pm2 stop [id] 停止制动id的应用
5. pm2 kill 杀掉pm2进程
6. pm2 logs [app-name] 查看指定应用日志
7. pm2 flush 清空所有日志
8. pm2 delete [id]  删除指定id的应用
9. pm2 monit 显示每个应用程序的CPU和内存占用情况