//跨平台 执行命令
import spawn from 'cross-spawn-async';
export default {
    addEvent(obj, eventName, options, cb) {
        obj.on(eventName, (data) => {
            cb && cb(data);
        });
    },
    /**
     * 
     * @param {cmd,deps,spawnOptions} options 
     */
    create(options) {
        let result = spawn(options.cmd, options.deps || [], Object.assign(options.spawnOptions, {}));
        this.addEvent(result.stdout, 'data', options, options.stdoutCallback);
        this.addEvent(result.stderr, 'data', options, options.stderrCallback);
        this.addEvent(result, 'close', options, options.closeCallback);
        return result;
    },
    /**
     * 
     * @param {命令名称} name 
     * @param {cwd} options 
     */
    run(name, options) {
        return new Promise((resolve, reject) => {
            let result = this.create({
                deps: options.deps,
                cmd: name,
                spawnOptions: { cwd: options.cwd },
                stdoutCallback: (data) => {
                    appUtils.log(`STDOUT:${data}`);
                    options.stdoutCallback && options.stdoutCallback(data);
                },
                stderrCallback: (data) => {
                    appUtils.log(`STDERR:${data}`);
                    options.stdoutCallback && options.stdoutCallback(data);
                },
                closeCallback: (data) => {
                    appUtils.isDev() && console.log(`CLOSE:${data}`);
                    resolve(data);
                }
            });
        })
    }
};