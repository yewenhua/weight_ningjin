const Subscription = require('egg').Subscription;

class Retry extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '1m', // 1 分钟间隔
            type: 'worker'  // only run in one worker
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        let { ctx } = this;
        let host = "http://127.0.0.1:7001";
        let version = ctx.app.config.version;
        let url = host + `/${version}/api/city/retry`;
        await ctx.curl(url, {
            contentType: 'json',
        });
    }
}

module.exports = Retry;
