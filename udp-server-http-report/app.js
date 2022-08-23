'use strict';

const path = require('path');

module.exports = app => {
    app.beforeStart(async () => {
        // 定时任务 ensure memory cache exists before app ready
        //await app.runSchedule('refresh');   //应用启动时，手动执行定时任务进行系统初始化
    });

    //通过 messenger 传递数据效率是比较低，因为它会通过 Master 来做中转，IPC 通道出现问题还可能将 Master 进程搞挂
    app.messenger.on('refresh', by => {
        app.logger.info('start update by %s', by);

        //非用户请求的场景下 创建一个匿名 Context 实例
        const ctx = app.createAnonymousContext();
        ctx.runInBackground(async () => {
            await ctx.service.source.update();
            app.lastUpdateBy = by;  //application对象上的变量
        });
    });

    //接收最新的烟气等DCS上报的数据
    app.messenger.on('newcoming', params=>{
        //非用户请求的场景下 创建一个匿名 Context 实例
        const ctx = app.createAnonymousContext();
        ctx.runInBackground(async () => {
            await ctx.service.storage.insertMany(params);
        });
    });

    // 使用Loader来加载validate下面的所有文件，加载所有的校验规则
    const directory = path.join(app.config.baseDir, 'app/validate');
    app.loader.loadToApp(directory, 'validate');

    app.once('server', server => {
        // websocket
    });
    app.on('error', (err, ctx) => {
        // report error
    });
    app.on('request', ctx => {
        // log receive request
    });
    app.on('response', ctx => {
        // ctx.starttime is set by framework
        const used = Date.now() - ctx.starttime;
        // log total cost
    });
};
