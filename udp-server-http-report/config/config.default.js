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
        {
            'itemCode': 'GL_HXTPSLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HXT01_SJLL',  //测点在源系统的code
            'cnName': '1#活性炭喷射流量',  //测点中文名
        },
        {
            'itemCode': 'GL_HXTPSLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HXT01_SJLL',  //测点在源系统的code
            'cnName': '2#活性炭喷射流量',  //测点中文名
        },
        {
            'itemCode': 'GL_HXTPSFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HXT01_YXXS',  //测点在源系统的code
            'cnName': '1#活性炭喷射风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_HXTPSFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HXT01_YXXS',  //测点在源系统的code
            'cnName': '2#活性炭喷射风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'TSFYT_RKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_051',  //测点在源系统的code
            'cnName': '1#脱酸反应塔入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'TSFYT_RKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_051',  //测点在源系统的code
            'cnName': '2#脱酸反应塔入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'GLDLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_001',  //测点在源系统的code
            'cnName': '1#1段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GLDLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_001',  //测点在源系统的code
            'cnName': '2#1段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_002',  //测点在源系统的code
            'cnName': '1#2段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_002',  //测点在源系统的code
            'cnName': '2#2段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_3DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_003',  //测点在源系统的code
            'cnName': '1#3段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_3DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_003',  //测点在源系统的code
            'cnName': '2#3段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_4DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_004',  //测点在源系统的code
            'cnName': '1#4段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_4DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_004',  //测点在源系统的code
            'cnName': '2#4段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_YQZXHFJCRKDB',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HC_049_XV',  //测点在源系统的code
            'cnName': '1#烟气再循环风机出入口挡板',  //测点中文名
        },
        {
            'itemCode': 'GL_YQZXHFJCRKDB',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HC_049_XV',  //测点在源系统的code
            'cnName': '2#烟气再循环风机出入口挡板',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_101',  //测点在源系统的code
            'cnName': '1#1列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_101',  //测点在源系统的code
            'cnName': '2#1列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_105',  //测点在源系统的code
            'cnName': '1#1列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_105',  //测点在源系统的code
            'cnName': '2#1列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_102',  //测点在源系统的code
            'cnName': '1#2列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_102',  //测点在源系统的code
            'cnName': '2#2列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_106',  //测点在源系统的code
            'cnName': '1#2列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_106',  //测点在源系统的code
            'cnName': '2#2列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_103',  //测点在源系统的code
            'cnName': '1#3列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_103',  //测点在源系统的code
            'cnName': '2#3列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_107',  //测点在源系统的code
            'cnName': '1#3列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_107',  //测点在源系统的code
            'cnName': '2#3列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_104',  //测点在源系统的code
            'cnName': '1#4列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_104',  //测点在源系统的code
            'cnName': '2#4列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_108',  //测点在源系统的code
            'cnName': '1#4列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_108',  //测点在源系统的code
            'cnName': '2#4列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'YFJ_DL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.YF_CE',  //测点在源系统的code
            'cnName': '1#炉引风机电流',  //测点中文名
        },

		{
            'itemCode': 'YFJ_DL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.YF_CE',  //测点在源系统的code
            'cnName': '2#炉引风机电流',  //测点中文名
        },

		{
            'itemCode': 'YFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.YF_ZS',  //测点在源系统的code
            'cnName': '1#引风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.YF_ZS',  //测点在源系统的code
            'cnName': '2#炉引风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.YF_CS1',  //测点在源系统的code
            'cnName': '1#炉引风机频率',  //测点中文名
        },

		{
            'itemCode': 'YFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.YF_CS1',  //测点在源系统的code
            'cnName': '2#炉引风机频率',  //测点中文名
        },

		{
            'itemCode': 'YFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_072C',  //测点在源系统的code
            'cnName': '1#炉引风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'YFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_072C',  //测点在源系统的code
            'cnName': '2#炉引风机线圈温度',  //测点中文名
        },


		{
            'itemCode': 'YFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_072A',  //测点在源系统的code
            'cnName': '1#炉引风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'YFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_072A',  //测点在源系统的code
            'cnName': '2#炉引风机轴承温度（主动侧/从动侧）',  //测点中文名
        },


		{
            'itemCode': 'YCFJ_YXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.GF_CE1',  //测点在源系统的code
            'cnName': '1#炉一次风机运行电流',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_YXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.GF_CE1',  //测点在源系统的code
            'cnName': '2#炉一次风机运行电流',  //测点中文名
        },


		{
            'itemCode': 'YCFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.GF_ZS1',  //测点在源系统的code
            'cnName': '1#炉一次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.GF_ZS1',  //测点在源系统的code
            'cnName': '2#炉一次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.GF_CS1',  //测点在源系统的code
            'cnName': '1#炉一次风机电流频率',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.GF_CS1',  //测点在源系统的code
            'cnName': '2#炉一次风机电流频率',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_071C',  //测点在源系统的code
            'cnName': '1#炉一次风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_071C',  //测点在源系统的code
            'cnName': '2#炉一次风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_071A',  //测点在源系统的code
            'cnName': '1#炉一次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_071A',  //测点在源系统的code
            'cnName': '2#炉一次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_FL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.FRQ_007COM_RESET',  //测点在源系统的code
            'cnName': '1#炉一次风机风量',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_FL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.FRQ_007COM_RESET',  //测点在源系统的code
            'cnName': '2#炉一次风机风量',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_FW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_045A',  //测点在源系统的code
            'cnName': '1#炉一次风温度',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_FW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_045A',  //测点在源系统的code
            'cnName': '2#炉一次风温度',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_YXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.RF_CE1',  //测点在源系统的code
            'cnName': '1#炉二次风机运行电流',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_YXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.RF_CE1',  //测点在源系统的code
            'cnName': '2#炉二次风机运行电流',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.RF_ZS1',  //测点在源系统的code
            'cnName': '1#炉二次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.RF_ZS1',  //测点在源系统的code
            'cnName': '2#炉二次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.RF_CS1',  //测点在源系统的code
            'cnName': '1#炉二次风机电流频率',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.RF_CS1',  //测点在源系统的code
            'cnName': '2#炉二次风机电流频率',  //测点中文名
        },


		{
            'itemCode': 'ECFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_070C',  //测点在源系统的code
            'cnName': '1#炉二次风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_070C',  //测点在源系统的code
            'cnName': '2#炉二次风机线圈温度',  //测点中文名
        },


		{
            'itemCode': 'ECFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_070A',  //测点在源系统的code
            'cnName': '1#炉二次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_070A',  //测点在源系统的code
            'cnName': '2#炉二次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },


		{
            'itemCode': 'ECFJ_FW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_046E',  //测点在源系统的code
            'cnName': '1#炉二次风温度',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_FW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_046E',  //测点在源系统的code
            'cnName': '2#炉二次风温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_JQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRA_4101',  //测点在源系统的code
            'cnName': '1#炉汽机进汽温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_JQLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.FRQ_4101COM',  //测点在源系统的code
            'cnName': '1#炉汽机进汽流量',  //测点中文名
        },


		{
            'itemCode': 'QJ_JQL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.FRQ_4101COM_ACC',  //测点在源系统的code
            'cnName': '1#炉汽机进汽量(累积值)',  //测点中文名
        },

		{
            'itemCode': 'QJ_FDJGL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.DEH_AI_04',  //测点在源系统的code
            'cnName': '1#炉汽机发电机功率',  //测点中文名
        },


		{
            'itemCode': 'QJ_QJZS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SIA_4307',  //测点在源系统的code
            'cnName': '1#炉汽机转速',  //测点中文名
        },

		{
            'itemCode': 'QJ_QJETSZS_A',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SIA_4304',  //测点在源系统的code
            'cnName': '1#炉汽机ETS转速A',  //测点中文名
        },


		{
            'itemCode': 'QJ_QJETSZS_B',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SIA_4305',  //测点在源系统的code
            'cnName': '1#炉汽机ETS转速B',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRA_4104',  //测点在源系统的code
            'cnName': '1#炉汽机主汽压力',  //测点中文名
        },


		{
            'itemCode': 'QJ_1TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4213',  //测点在源系统的code
            'cnName': '1#炉#1推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4214',  //测点在源系统的code
            'cnName': '1#炉#2推力瓦温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_3TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4215',  //测点在源系统的code
            'cnName': '1#炉#3推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_4TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4216',  //测点在源系统的code
            'cnName': '1#炉#4推力瓦温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_5TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4240',  //测点在源系统的code
            'cnName': '1#炉#5推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_6TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4241',  //测点在源系统的code
            'cnName': '1#炉#6推力瓦温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_7TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4242',  //测点在源系统的code
            'cnName': '1#炉#7推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_8TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4243',  //测点在源系统的code
            'cnName': '1#炉#8推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_1WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4211',  //测点在源系统的code
            'cnName': '1#炉#1瓦轴承温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4212',  //测点在源系统的code
            'cnName': '1#炉#2瓦轴承温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_1WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4217',  //测点在源系统的code
            'cnName': '1#炉#1瓦轴承温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4218',  //测点在源系统的code
            'cnName': '1#炉#2瓦轴承温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_1WHYWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4226',  //测点在源系统的code
            'cnName': '1#炉#1瓦回油温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WHYWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4227',  //测点在源系统的code
            'cnName': '1#炉#2瓦回油温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_1WZD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GIA_4201',  //测点在源系统的code
            'cnName': '1#炉#1瓦振动',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WZD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GIA_4202',  //测点在源系统的code
            'cnName': '1#炉#2瓦振动',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZC',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GdIA_4209',  //测点在源系统的code
            'cnName': '1#炉胀差',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZXWY',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GIA_4210',  //测点在源系统的code
            'cnName': '1#炉轴向位移',  //测点中文名
        },

		{
            'itemCode': 'QJ_YJCQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4116',  //测点在源系统的code
            'cnName': '1#炉一级抽气压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_YJCQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4116',  //测点在源系统的code
            'cnName': '1#炉一级抽气压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_YJCQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_4114',  //测点在源系统的code
            'cnName': '1#炉一级抽气温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_EJCQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4118',  //测点在源系统的code
            'cnName': '1#炉二级抽气压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_EJCQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_4115',  //测点在源系统的code
            'cnName': '1#炉二级抽气温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_QLJZK',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRA_4160_QJ',  //测点在源系统的code
            'cnName': '1#炉汽轮机真空',  //测点中文名
        },

		{
            'itemCode': 'QJ_RHYY',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4222',  //测点在源系统的code
            'cnName': '1#炉润滑油压',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZYXYW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.LIA_4201',  //测点在源系统的code
            'cnName': '1#炉主油箱油位',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZYBCKYY',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4222',  //测点在源系统的code
            'cnName': '1#炉主油泵出口油压',  //测点中文名
        },

		{
            'itemCode': 'QJ_CYQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRCA_0219',  //测点在源系统的code
            'cnName': '1#炉除氧器压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_CYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_0212',  //测点在源系统的code
            'cnName': '1#炉除氧器温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.FRQ_4102COM',  //测点在源系统的code
            'cnName': '1#炉凝结水流量',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_4151',  //测点在源系统的code
            'cnName': '1#炉凝结水温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRCZA_4140',  //测点在源系统的code
            'cnName': '1#炉凝结水压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_JLYBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SGBJ_SGYB_RUN_OUT',  //测点在源系统的code
            'cnName': '1#炉交流油泵运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZLYBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SGBJ_ZLYB_RUN_OUT',  //测点在源系统的code
            'cnName': '1#炉直流油泵运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_JLYBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.JLRHYB1_CE',  //测点在源系统的code
            'cnName': '1#炉交流油泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZLYBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.ZLYB1_CE',  //测点在源系统的code
            'cnName': '1#炉直流油泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_PCYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PCJAC1_ZS',  //测点在源系统的code
            'cnName': '1#炉盘车运行状态',  //测点中文名
        },

		{
            'itemCode': '',  //测点在管控平台的CODE
            'sourceCode': '',  //测点在源系统的code
            'cnName': '1#炉',  //测点中文名
        },

		{
            'itemCode': 'QJ_PCDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PCJAC1_CE',  //测点在源系统的code
            'cnName': '1#炉盘车电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZKBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SHZKB1_ZS',  //测点在源系统的code
            'cnName': '1#炉真空泵运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_SSBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SHZKB1_CE',  //测点在源系统的code
            'cnName': '1#炉真空泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.NJB1_CE1',  //测点在源系统的code
            'cnName': '1#炉凝结水泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSBZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SGBJ_NJB1_RUN_OUT',  //测点在源系统的code
            'cnName': '1#炉凝结水泵状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_RJSW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.LRCZA_4101',  //测点在源系统的code
            'cnName': '1#炉热井水位',  //测点中文名
        },

		{
            'itemCode': 'LJC_ZDDCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.WRQ_0101',  //测点在源系统的code
            'cnName': '1#炉抓斗吊称重',  //测点中文名
        },

		{
            'itemCode': 'LJC_LJCFY_A',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.PRZA_0101',  //测点在源系统的code
            'cnName': '1#炉垃圾池负压A信号',  //测点中文名
        },

		{
            'itemCode': 'LJC_CCFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.CCFJ_ZS',  //测点在源系统的code
            'cnName': '1#炉垃圾池除臭风机运行状态',  //测点中文名
        },

		{
            'itemCode': 'YQ_DUST_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_Dust',  //测点在源系统的code
            'cnName': '1#炉粉尘实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_DUST_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_Dust',  //测点在源系统的code
            'cnName': '2#炉粉尘实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_HCL_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_HCL',  //测点在源系统的code
            'cnName': '1#炉HCL实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_HCL_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_HCL',  //测点在源系统的code
            'cnName': '2#炉HCL实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_SO2_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_SO2',  //测点在源系统的code
            'cnName': '1#炉SO2实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_SO2_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_SO2',  //测点在源系统的code
            'cnName': '2#炉SO2实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_NOX_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_NOX',  //测点在源系统的code
            'cnName': '1#炉NOx实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_NOX_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_NOX',  //测点在源系统的code
            'cnName': '2#炉NOx实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_CO_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_CO',  //测点在源系统的code
            'cnName': '1#炉CO实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_CO_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_CO',  //测点在源系统的code
            'cnName': '2#炉CO实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_DUST_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_Dust_ZS',  //测点在源系统的code
            'cnName': '1#炉粉尘_折算实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_DUST_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_Dust_ZS',  //测点在源系统的code
            'cnName': '2#炉粉尘_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_HCL_ZS',  //测点在源系统的code
            'cnName': '1#炉HCL_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_HCL_ZS',  //测点在源系统的code
            'cnName': '2#炉HCL_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_SO2_ZS',  //测点在源系统的code
            'cnName': '1#炉SO2_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_SO2_ZS',  //测点在源系统的code
            'cnName': '2#炉SO2_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_NOX_ZS',  //测点在源系统的code
            'cnName': '1#炉NOx_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_NOX_ZS',  //测点在源系统的code
            'cnName': '2#炉NOx_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_CO_ZS',  //测点在源系统的code
            'cnName': '1#炉CO_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_CO_ZS',  //测点在源系统的code
            'cnName': '2#炉CO_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_YL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_O2',  //测点在源系统的code
            'cnName': '1#炉氧量',  //测点中文名
        },
		{
            'itemCode': 'YQ_YL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_O2',  //测点在源系统的code
            'cnName': '2#炉氧量',  //测点中文名
        },

		{
            'itemCode': 'YQ_YQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_PRESS',  //测点在源系统的code
            'cnName': '1#炉烟气压力',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_PRESS',  //测点在源系统的code
            'cnName': '2#炉烟气压力',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQSD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_H2O',  //测点在源系统的code
            'cnName': '1#炉烟气湿度',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQSD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_H2O',  //测点在源系统的code
            'cnName': '2#炉烟气湿度',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_TEMP',  //测点在源系统的code
            'cnName': '1#炉烟气温度',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_TEMP',  //测点在源系统的code
            'cnName': '2#炉烟气温度',  //测点中文名
        },
		{
            'itemCode': 'YQ_DUST_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_Dust_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉粉尘(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_DUST_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_Dust_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉粉尘(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_DUST_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_Dust_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉粉尘(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_DUST_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_Dust_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉粉尘(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_HCL_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉HCL(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_HCL_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉HCL(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_HCL_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉HCL(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_HCL_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉HCL(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_NOX_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉NOx(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_NOX_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉NOx(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_NOX_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉NOx(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_NOX_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉NOx(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_CO_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉CO(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_CO_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉CO(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_CO_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉CO(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_CO_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉CO(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_SO2_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉SO2(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_SO2_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉SO2(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_SO2_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉SO2(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_SO2_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉SO2(日均值)',  //测点中文名
        },
		{
            'itemCode': 'SLY_SLYCYW_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.LIZA_0001',  //测点在源系统的code
            'cnName': '1#炉垃圾渗滤液池液位左信号（调节池',  //测点中文名
        },
		{
            'itemCode': 'SLY_SLYBCKMGLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.FRQ_0001',  //测点在源系统的code
            'cnName': '1#炉垃圾渗滤液泵出口母管流量',  //测点中文名
        },
        //以下为500点位
        {
            'itemCode': 'GL_SHJLL',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..FI_001_AI',  //测点在源系统的code
            'cnName': '1#石灰浆流量',  //测点中文名
        },
        {
            'itemCode': 'GL_SHJLL',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..FI_001_AI',  //测点在源系统的code
            'cnName': '2#石灰浆流量',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZS',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..WHDJ_CS1_AI',  //测点在源系统的code
            'cnName': '1#雾化器转速',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZS',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..WHDJ_CS1_AI',  //测点在源系统的code
            'cnName': '2#雾化器转速',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQYXZT',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..WHDJ_Run',  //测点在源系统的code
            'cnName': '1#雾化器运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZD',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..WHDJ_Run',  //测点在源系统的code
            'cnName': '2#雾化器运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZD',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..BSQ_ZI_AI',  //测点在源系统的code
            'cnName': '1#雾化器振动',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZS',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..BSQ_ZI_AI',  //测点在源系统的code
            'cnName': '2#雾化器振动',  //测点中文名
        },
        {
            'itemCode': 'GL_SHJBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SHZJ..ZJB1_Run',  //测点在源系统的code
            'cnName': '石灰浆泵运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_SHJBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SHZJ..ZJB2_Run',  //测点在源系统的code
            'cnName': '石灰浆泵2运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_GFFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'GFTS1..B1_Run',  //测点在源系统的code
            'cnName': '1#干法风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_GFFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'GFTS2..B1_Run',  //测点在源系统的code
            'cnName': '2#干法风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_SNCRHYJPSBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..B1_Run',  //测点在源系统的code
            'cnName': '1#炉SNCR还原剂喷射泵运行状态',  //测点中文名
        },
		{
            'itemCode': 'GL_SNCRHYJPSBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..B2_Run',  //测点在源系统的code
            'cnName': '1#炉SNCR还原剂喷射泵2运行状态',  //测点中文名
        },
		{
            'itemCode': 'GL_SNCRHYJPSLL',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..FI_001_AI',  //测点在源系统的code
            'cnName': '1#炉SNCR还原剂喷射流量',  //测点中文名
        },
		{
            'itemCode': 'GL_SNCRHYJPSBCKYL',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..PI_001_AI',  //测点在源系统的code
            'cnName': '1#炉SNCR还原剂喷射泵出口压力',  //测点中文名
        },
    ];

    return {
        ...config,
        ...userConfig,
    };
};
