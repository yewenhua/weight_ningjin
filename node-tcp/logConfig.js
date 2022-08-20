const log4js = require('log4js');

log4js.configure({
    replaceConsole: true,

    //
    appenders: {
        //自定义名字
        stdout: {//控制台输出
            type: 'stdout' //官方名字
        },
        req: {//请求日志
            type: 'dateFile',
            filename: 'logs/req/log',
            daysToKeep: 7,
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        err: {//错误日志
            type: 'dateFile',
            filename: 'logs/err/log',
            daysToKeep: 7,
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        oth: {//其他日志
            type: 'dateFile',
            filename: 'logs/oth/log',
            daysToKeep: 7,
            pattern: 'oth-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },

    /*
     * getLogger(name)  name对应该对象的键
     * log4js 的输出级别（从低到高）： trace，debug，info，warn，error，fatal
     * 如果输出级别是 info，则不会打印出低于 info 级别的日志 trace，debug，只打印info，warn，error，fatal
     */
    categories: {
        default: { appenders: ['stdout'], level: 'debug' },  //只输入到标准输出
        access: { appenders: ['req'], level: 'info' },
        err: { appenders: ['stdout', 'err'], level: 'error' },
        oth: { appenders: ['stdout', 'oth'], level: 'info' }
    },
    pm2: true
})

//name取categories项
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
}