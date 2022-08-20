/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const I18n = require('i18n');
I18n.configure({
    locales: [ 'zh-CN' ],
    defaultLocale: 'zh-CN',
    directory: __dirname + '/locale',
});

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1589933433191_8738';

    // add your middleware config here
    config.middleware = [ 'errorHandler' ];

    // add your user config here
    const userConfig = {
        token: '08525b857f40f7b87ee4a0206e8e318f',
    };

    config.sequelize = {
        datasources: [
            {
                dialect: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: '64y7nudx',
                database: 'egg',
                delegate: 'modelMysql',
                baseDir: 'modelMysql',  //sequelize和mongoose不能同时共存解决方案
                define: {
                  schema: "dbo" //定义表名的前缀
                },
                timezone: '+08:00',
            },
            // {
            //     dialect: 'mssql',
            //     host: '127.0.0.1',
            //     port: 1433,
            //     database: 'weight',
            //     delegate: 'modelMssql',
            //     baseDir: 'modelMssql'  //sequelize和mongoose不能同时共存解决方案
            // }
            //...the other database
        ]
    };

    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: [ 'http://localhost:8080' ] //允许访问接口的白名单
    };

    config.validate = {   // 配置参数校验器，基于parameter
        convert: true,    // 对参数可以使用convertType规则进行类型转换
        translate() {
            const args = Array.prototype.slice.call(arguments);
            return I18n.__.apply(I18n, args);
        },
    };

    config.taizhouFenshaoApi = {
        accessKeyId: 'JJLJFL_LHSSHLJ_2022051306',
        accessSecret: 'db4f5245f21c2022051306',
        host: '111.3.67.37:8082',
        term_id: '1025',
        systemCode: 'JJLJFL',
        disposeUnitCode: '1025',
        weightNo: 'A'
    };

    config.redis = {
        client: {
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 0
        },
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.multipart = {
        //新增支持的文件扩展名, 默认有支持白名单
        fileExtensions: [
            '.doc',
            '.docx',
            '.txt',
            '.apk'
        ],
        fileSize: '30mb',//文件上传的大小限制
    };

    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1/egg',
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }
        },
    };

    config.io = {
        init: {}, // passed to engine.io
        namespace: {
            '/': {
                connectionMiddleware: [ 'connection' ],
                packetMiddleware: [ 'packet' ],
            },
        },
        redis: {
            host: '127.0.0.1',
            port: 6379,
            db: 1
        }
    };

    config.version = 'v1';

    config.avs = {
        host: '',
        partnerId: ''
    };

    config.view = {
        mapping: {
            '.html': 'nunjucks'
        }
    };

    //自定义日志路径
    config.logger = {
        dir: path.join(__dirname, '../logs/eggjs')
    };

    return {
        ...config,
        ...userConfig,
    };
};
