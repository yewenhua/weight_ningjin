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

    config.dcsTags = [
        {
            'itemCode': 'GL_LTSBWDT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_018L',  //测点在源系统的code
            'cnName': '1#炉膛内上部断面左墙温度（T10）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_018L',  //测点在源系统的code
            'cnName': '2#炉膛内上部断面左墙温度（T10）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_018M',  //测点在源系统的code
            'cnName': '1#炉膛内上部断面前墙温度（T11）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_018M',  //测点在源系统的code
            'cnName': '2#炉膛内上部断面前墙温度（T11）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT12',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_018R',  //测点在源系统的code
            'cnName': '1#炉膛内上部断面右墙温度（T12）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT12',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_018R',  //测点在源系统的code
            'cnName': '2#炉膛内上部断面右墙温度（T12）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT20',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_017L',  //测点在源系统的code
            'cnName': '1#炉膛内中部断面左墙温度（T20）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT20',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_017L',  //测点在源系统的code
            'cnName': '2#炉膛内中部断面左墙温度（T20）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT21',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_017M',  //测点在源系统的code
            'cnName': '1#炉膛内中部断面前墙温度（T21）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT21',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_017M',  //测点在源系统的code
            'cnName': '2#炉膛内中部断面前墙温度（T21）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT22',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_017R',  //测点在源系统的code
            'cnName': '1#炉膛内中部断面右墙温度（T22）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT22',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_017R',  //测点在源系统的code
            'cnName': '2#炉膛内中部断面右墙温度（T22）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT30',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_016L',  //测点在源系统的code
            'cnName': '1#炉膛内下部断面左墙温度（T30）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT30',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_016L',  //测点在源系统的code
            'cnName': '2#炉膛内下部断面左墙温度（T30）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT31',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_016M',  //测点在源系统的code
            'cnName': '1#炉膛内下部断面前墙温度（T31）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT31',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_016M',  //测点在源系统的code
            'cnName': '2#炉膛内下部断面前墙温度（T31）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT32',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_016R',  //测点在源系统的code
            'cnName': '1#炉膛内下部断面右墙温度（T32）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT32',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_016R',  //测点在源系统的code
            'cnName': '2#炉膛内二次风喷入点温度',  //测点中文名
        },
        {
            'itemCode': 'GL_LTNECFPRDWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_015L',  //测点在源系统的code
            'cnName': '1#炉膛内二次风喷入点温度',  //测点中文名
        },
        {
            'itemCode': 'GL_LTNECFPRDWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_015L',  //测点在源系统的code
            'cnName': '2#炉膛内二次风喷入点温度',  //测点中文名
        },
        {
            'itemCode': 'GL_LTCKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRCA_019L',  //测点在源系统的code
            'cnName': '1#炉膛出口负压(左侧)',  //测点中文名
        },
        {
            'itemCode': 'GL_LTCKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRCA_019L',  //测点在源系统的code
            'cnName': '2#炉膛出口负压(左侧)',  //测点中文名
        },
        {
            'itemCode': 'GL_LTCKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRCA_019R',  //测点在源系统的code
            'cnName': '1#炉膛出口负压(右侧)',  //测点中文名
        },
        {
            'itemCode': 'GL_LTCKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRCA_019R',  //测点在源系统的code
            'cnName': '2#炉膛出口负压(右侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_PHRQSW_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.LRCZA_001A',  //测点在源系统的code
            'cnName': '1#炉汽包平衡容器水位(左侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_PHRQSW_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.LRCZA_001A',  //测点在源系统的code
            'cnName': '2#炉汽包平衡容器水位(左侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_PHRQSW_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.LRCZA_001B',  //测点在源系统的code
            'cnName': '1#炉汽包平衡容器水位(右侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_PHRQSW_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.LRCZA_001B',  //测点在源系统的code
            'cnName': '2#炉汽包平衡容器水位(右侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_LQBYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRCA_006A',  //测点在源系统的code
            'cnName': '1#炉汽包压力',  //测点中文名
        },
        {
            'itemCode': 'LQB_LQBYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRCA_006A',  //测点在源系统的code
            'cnName': '2#炉汽包压力',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_ZS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_033A',  //测点在源系统的code
            'cnName': '1#汽包壁温（左上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_ZS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_033A',  //测点在源系统的code
            'cnName': '2#汽包壁温（左上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_YS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_035A',  //测点在源系统的code
            'cnName': '1#汽包壁温（右上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_YS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_035A',  //测点在源系统的code
            'cnName': '2#汽包壁温（右上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_ZX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_033B',  //测点在源系统的code
            'cnName': '1#汽包壁温（左下）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_ZX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_033B',  //测点在源系统的code
            'cnName': '2#汽包壁温（左下）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_YX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_035B',  //测点在源系统的code
            'cnName': '1#汽包壁温（右下）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_YX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_035B',  //测点在源系统的code
            'cnName': '2#汽包壁温（右下）',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRCA_010',  //测点在源系统的code
            'cnName': '1#主蒸汽温度',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRCA_010',  //测点在源系统的code
            'cnName': '2#主蒸汽温度',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRA_010B',  //测点在源系统的code
            'cnName': '1#主蒸汽压力',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRA_010B',  //测点在源系统的code
            'cnName': '2#主蒸汽压力',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.FRCQ_004COM',  //测点在源系统的code
            'cnName': '1#主蒸汽流量',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.FRCQ_004COM',  //测点在源系统的code
            'cnName': '2#主蒸汽流量',  //测点中文名
        },
        {
            'itemCode': 'GL_XKPQFZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HS_002_ZO',  //测点在源系统的code
            'cnName': '1#向空排汽阀状态',  //测点中文名
        },
        {
            'itemCode': 'GL_XKPQFZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HS_002_ZO',  //测点在源系统的code
            'cnName': '2#向空排汽阀状态',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_021L',  //测点在源系统的code
            'cnName': '1#高温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_021L',  //测点在源系统的code
            'cnName': '2#高温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_021R',  //测点在源系统的code
            'cnName': '1#高温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_021R',  //测点在源系统的code
            'cnName': '2#高温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_021L',  //测点在源系统的code
            'cnName': '1#高温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_021L',  //测点在源系统的code
            'cnName': '2#高温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_021R',  //测点在源系统的code
            'cnName': '1#高温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_021R',  //测点在源系统的code
            'cnName': '2#高温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_022L',  //测点在源系统的code
            'cnName': '1#中温过热器入口烟气温温（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_022L',  //测点在源系统的code
            'cnName': '2#中温过热器入口烟气温温（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_022R',  //测点在源系统的code
            'cnName': '1#中温过热器入口烟气温温（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_022R',  //测点在源系统的code
            'cnName': '2#中温过热器入口烟气温温（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_022L',  //测点在源系统的code
            'cnName': '1#中温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_022L',  //测点在源系统的code
            'cnName': '2#中温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_022R',  //测点在源系统的code
            'cnName': '1#中温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_022R',  //测点在源系统的code
            'cnName': '2#中温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_023L',  //测点在源系统的code
            'cnName': '1#低温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_023L',  //测点在源系统的code
            'cnName': '2#低温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_023R',  //测点在源系统的code
            'cnName': '1#低温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_023R',  //测点在源系统的code
            'cnName': '2#低温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_023L',  //测点在源系统的code
            'cnName': '1#低温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_023L',  //测点在源系统的code
            'cnName': '2#低温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_023R',  //测点在源系统的code
            'cnName': '1#低温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_023R',  //测点在源系统的code
            'cnName': '2#低温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_024L',  //测点在源系统的code
            'cnName': '1#一级省煤器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_024L',  //测点在源系统的code
            'cnName': '2#一级省煤器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_024R',  //测点在源系统的code
            'cnName': '1#一级省煤器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_024R',  //测点在源系统的code
            'cnName': '2#一级省煤器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_024L',  //测点在源系统的code
            'cnName': '1#一级省煤器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_024L',  //测点在源系统的code
            'cnName': '2#一级省煤器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_024R',  //测点在源系统的code
            'cnName': '1#一级省煤器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_024R',  //测点在源系统的code
            'cnName': '2#一级省煤器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_CKYHL_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ARCA_001L',  //测点在源系统的code
            'cnName': '1#锅炉出口氧含量（省煤器左侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_CKYHL_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ARCA_001L',  //测点在源系统的code
            'cnName': '2#锅炉出口氧含量（省煤器左侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_CKYHL_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ARCA_001R',  //测点在源系统的code
            'cnName': '1#锅炉出口氧含量（省煤器右侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_CKYHL_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ARCA_001R',  //测点在源系统的code
            'cnName': '2#锅炉出口氧含量（省煤器右侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_PYWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_025L',  //测点在源系统的code
            'cnName': '1#排烟温度（省煤器出口左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_PYWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_025L',  //测点在源系统的code
            'cnName': '2#排烟温度（省煤器出口左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_PYWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_025R',  //测点在源系统的code
            'cnName': '1#排烟温度（省煤器出口右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_PYWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_025R',  //测点在源系统的code
            'cnName': '2#排烟温度（省煤器出口右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_SMQCKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_025L',  //测点在源系统的code
            'cnName': '1#省煤器出口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_SMQCKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_025L',  //测点在源系统的code
            'cnName': '2#省煤器出口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_SMQCKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_025R',  //测点在源系统的code
            'cnName': '1#省煤器出口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_SMQCKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_025R',  //测点在源系统的code
            'cnName': '2#省煤器出口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_RKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRCA_052',  //测点在源系统的code
            'cnName': '1#布袋除尘器入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_RKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRCA_052',  //测点在源系统的code
            'cnName': '2#布袋除尘器入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_YC',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PDI_053',  //测点在源系统的code
            'cnName': '1#布袋除尘器压差',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_YC',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PDI_053',  //测点在源系统的code
            'cnName': '2#布袋除尘器压差',  //测点中文名
        },

    ];

    return {
        ...config,
        ...userConfig,
    };
};
