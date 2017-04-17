 import pm2 from 'pm2';
 //process   可以是pm2_id 或者项目名称
 //pm2常见操作的封装
 export default {
     //连接pm2 部分操作 必须先连接才能操作 比如start stop restart
     connect(connectCallback) {
         return new Promise((resolve) => {
             pm2.connect((err, state) => {
                 resolve({ err, state });
             });
         }).then((result) => {
             return new Promise((resolve) => {
                 if (!result.err) { //如果连接成功
                     connectCallback(resolve, result);
                 } else {
                     resolve(result);
                 }
             });
         }).then(this.disconnect);
     },
     //断开连接
     disconnect(result) {
         return new Promise((resolve) => {
             if (!result.err) {
                 pm2.disconnect((err) => {
                     resolve(result);
                 });
             } else {
                 resolve(result);
             }
         });
     },
     //启动程序
     start(cwd, options) {
         return this.connect((resolve) => {
             pm2.start(Object.assign({
                 cwd: cwd,
                 script: 'bin/run', // Script to be run
                 execMode: 'fork', // Allows your app to be clustered  
                 maxRestarts: 15,
                 pid: './temp/app.pid',
                 nodeArgs: [],
                 env: {}
             }, options), (err, apps) => {
                 resolve({ err, apps });
             });
         });
     },
     //停止一个进程   传入id 或者 name
     stop(process) {
         return this.connect((resolve) => {
             pm2.stop(process, (err, apps) => {
                 resolve({ err, apps }); // Disconnects from PM2 
             });
         });
     },
     //停止并从列表上删除一个进程
     delete(process) {
         return this.connect((resolve) => {
             pm2.delete(process, (err, apps) => {
                 resolve({ err, apps }); // Disconnects from PM2 
             });
         });
     },
     //根据process 重启一个项目
     restart(process) {
         return this.connect((resolve) => {
             pm2.restart(process, (err, list) => {
                 resolve({ err, list });
             });
         });
     },
     //获取当前pm2托管的所有项目
     list() {
         return this.connect((resolve) => {
             pm2.list((err, list) => {
                 resolve({ err, list });
             });
         });
     },
     //关闭守护进程
     killDaemon() {
         return this.connect((resolve) => {
             pm2.killDaemon((err, list) => {
                 resolve({ err, list });
             })
         });
     },
     //清除日志
     flush(process) {
         return this.connect((resolve) => {
             pm2.flush(process, (err) => {
                 resolve({ err });
             });
         });
     },
     //优雅重启,会向对应进程发送重启通知
     gracefulReload(process) {
         return this.connect((resolve) => {
             pm2.gracefulReload(process, (err) => {
                 resolve({ err });
             })
         });
     },
     //查看对应进程的信息
     describe(process) {
         return this.connect((resolve) => {
             pm2.gracefulReload(process, (err) => {
                 resolve({ err });
             })
         });
     }
 };