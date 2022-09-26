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
        host: 'http://123.183.193.189',
        port: '33333',
        username: 'jwhb',
        password: 'jwhb@123456'
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

    //市平台DCS配置文件
    config.cityTags = [
        {
            'paramId':'8d22523b-1752-4dfe-a3f7-fd4314e9895f',
            'paramName':'1#焚烧炉1#给水泵电流',
            'paramUnit':'A',
			'paramType':'原料',
            'tag':'Applications.TurbineParts.GB1_CE',  //测点在源系统的code
        },

		{
            'paramId':'5a78134b-fd53-487b-91cc-a8b32f070d91',
            'paramName':'1#焚烧炉2#给水泵电流',
            'paramUnit':'A',
			'paramType':'原料',
            'tag':'Applications.TurbineParts.GB2_CE',  //测点在源系统的code
        },

		{
            'paramId':'96440d1e-c1c2-4743-a86c-278e7d0134ad',
            'paramName':'1#焚烧炉3#给水泵电流',
            'paramUnit':'A',
			'paramType':'原料',
            'tag':'Applications.TurbineParts.GB3_CE',  //测点在源系统的code
        },

		{
            'paramId':'5220c249-ed6f-464f-8d40-fbee2727183e',
            'paramName':'1#焚烧炉SCR氨水调节阀开度',
            'paramUnit':'%',
			'paramType':'治理',
            'tag':'SCR1..M_AI_003',  //测点在源系统的code
        },

		{
            'paramId':'1099ff7f-64c5-4467-93cb-4e40ba20aa42',
            'paramName':'1#焚烧炉SCR反应器出口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'SCR1..M_TI_004',  //测点在源系统的code
        },

		{
            'paramId':'0b967134-4060-495a-8646-b536436f3da0',
            'paramName':'1#焚烧炉SCR反应器入口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.TR_053',  //测点在源系统的code
        },

		{
            'paramId':'3403f72d-4383-43c7-9c87-efdb4566a7d3',
            'paramName':'1#焚烧炉SNCR氨水流量',
            'paramUnit':'t/h',
			'paramType':'治理',
            'tag':'SNCR..FI_201_AI',  //测点在源系统的code
        },

		{
            'paramId':'7f7b7b0e-4cd5-4d67-bbe8-68d0e90c0c2a',
            'paramName':'1#焚烧炉SNCR氨水压力',
            'paramUnit':'mpa',
			'paramType':'治理',
            'tag':'SNCR..PI_201_AI',  //测点在源系统的code
        },

		{
            'paramId':'38d891e1-a627-47a7-82c3-6a6a2b28aa97',
            'paramName':'1#焚烧炉SNCR除盐水流量',
            'paramUnit':'t/h',
			'paramType':'治理',
            'tag':'SNCR..FI_102_AI',  //测点在源系统的code
        },

		{
            'paramId':'b815ff57-7b7f-41ad-b674-b0c3a0af6890',
            'paramName':'1#焚烧炉半干法脱硫进口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.TR_051',  //测点在源系统的code
        },

		{
            'paramId':'c81d92e8-a011-4eb1-bebe-4c34d5d8137c',
            'paramName':'1#焚烧炉半干法脱硫进口烟气压力',
            'paramUnit':'pa',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.PI_051',  //测点在源系统的code
        },

		{
            'paramId':'dc1a8fe0-93d9-4e1a-8471-5639b4268fbc',
            'paramName':'1#焚烧炉除尘器出口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.TR_053',  //测点在源系统的code
        },

		{
            'paramId':'10dcd5bb-e1ed-43a6-a015-ca79b44e52f3',
            'paramName':'1#焚烧炉除尘器进口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.TRCA_052',  //测点在源系统的code
        },

		{
            'paramId':'e0920e25-807b-41ef-8ea6-97e596f6f6af',
            'paramName':'1#焚烧炉除尘器压差',
            'paramUnit':'pa',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.PDI_053',  //测点在源系统的code
        },

		{
            'paramId':'4a14b02c-6a0c-4f99-8553-917d15c84971',
            'paramName':'1#焚烧炉点火燃烧器燃料流量',
            'paramUnit':'kg/h',
			'paramType':'能耗',
            'tag':'Applications.BurningLine1.RY_FI_RSQ01',  //测点在源系统的code
        },

		{
            'paramId':'8ba122db-f146-4484-b5a8-8c6bbbc07915',
            'paramName':'1#焚烧炉二次风机电流',
            'paramUnit':'A',
			'paramType':'能耗',
            'tag':'Applications.BurningLine1.RF_CE1',  //测点在源系统的code
        },

		{
            'paramId':'6d1409f4-cdce-4930-8dee-b7d85603bc6d',
            'paramName':'1#焚烧炉辅助燃烧器燃料流量',
            'paramUnit':'kg/h',
			'paramType':'能耗',
            'tag':'Applications.BurningLine1.RY_FI_RSQ03',  //测点在源系统的code
        },

		{
            'paramId':'f41e6e9d-c6db-4d97-8f1e-caa4262a23c5',
            'paramName':'1#焚烧炉给水流量',
            'paramUnit':'t/h',
			'paramType':'原料',
            'tag':'Applications.BurningLine1.FRCQ_001COM',  //测点在源系统的code
        },

		{
            'paramId':'fbe63b31-bbee-49ca-b93c-4618042d19f9',
            'paramName':'1#焚烧炉给水温度',
            'paramUnit':'°C',
			'paramType':'原料',
            'tag':'Applications.BurningLine1.TRA_001',  //测点在源系统的code
        },

		{
            'paramId':'e4a8d567-2c42-4872-be5a-8934ee9b8a86',
            'paramName':'1#焚烧炉给水压力',
            'paramUnit':'mpa',
			'paramType':'原料',
            'tag':'Applications.BurningLine1.PRA_001',  //测点在源系统的code
        },

		{
            'paramId':'3a5757f7-23e0-4b26-8741-d62bc7d48bd7',
            'paramName':'1#焚烧炉活性炭流量',
            'paramUnit':'kg/h',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.HXT01_SJLL',  //测点在源系统的code
        },

		{
            'paramId':'a79925d9-f81b-491a-a037-c19a6fb47aae',
            'paramName':'1#焚烧炉炉内干法称重仓重量',
            'paramUnit':'kg',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.GF1_SSZL_WI',  //测点在源系统的code
        },

		{
            'paramId':'c8ac95be-151e-4618-b16b-529e9109d6d7',
            'paramName':'1#焚烧炉炉内干法粉料累计',
            'paramUnit':'kg',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.GF1_SSZL_ACC',  //测点在源系统的code
        },

		{
            'paramId':'b1dcbd38-ab8a-49da-bdb7-42887d5aaa0c',
            'paramName':'1#焚烧炉炉内干法粉料流量',
            'paramUnit':'kg/h',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.GF1_Speed_h',  //测点在源系统的code
        },

		{
            'paramId':'601cbf5b-3835-43cb-9ebc-6a161e8a2d05',
            'paramName':'1#焚烧炉炉膛压力',
            'paramUnit':'pa',
			'paramType':'能耗',
            'tag':'Applications.BurningLine1.PRCA_019L',  //测点在源系统的code
        },

		{
            'paramId':'75bf9d2f-b34d-4025-8e0c-de5989336a7f',
            'paramName':'1#焚烧炉雾化器石灰浆液流量',
            'paramUnit':'t/h',
			'paramType':'治理',
            'tag':'WHQ1..FI_001_AI',  //测点在源系统的code
        },

		{
            'paramId':'33cb7f7e-e67a-4043-8e97-589a7fce6f31',
            'paramName':'1#焚烧炉雾化器转速',
            'paramUnit':'rpm',
			'paramType':'治理',
            'tag':'WHQ1...WHDJ_CS1_AI',  //测点在源系统的code
        },

		{
            'paramId':'6ed8da22-943c-48b2-8d1f-b8586601be9c',
            'paramName':'1#焚烧炉一次风机电流',
            'paramUnit':'A',
			'paramType':'能耗',
            'tag':'Applications.BurningLine1.GF_CE1',  //测点在源系统的code
        },

		{
            'paramId':'04b427a3-aed4-4394-af8d-cc4bf9396f02',
            'paramName':'1#焚烧炉一次风流量',
            'paramUnit':'m³/h',
			'paramType':'能耗',
            'tag':'Applications.BurningLine1.FRQ_007COM',  //测点在源系统的code
        },

		{
            'paramId':'565298aa-00cd-4bfd-8f02-aa116e2ca61e',
            'paramName':'1#焚烧炉引风机电流',
            'paramUnit':'A',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.YF_CE',  //测点在源系统的code
        },

		{
            'paramId':'d223911d-e4de-452e-8520-722d2dbb8ba7',
            'paramName':'1#焚烧炉蒸汽流量',
            'paramUnit':'t/h',
			'paramType':'生产',
            'tag':'Applications.BurningLine1.FRCQ_004COM',  //测点在源系统的code
        },

		{
            'paramId':'c606fe00-0207-4103-8d90-0e6a32776416',
            'paramName':'1#焚烧炉蒸汽温度',
            'paramUnit':'°C',
			'paramType':'生产',
            'tag':'Applications.BurningLine1.TRCA_010',  //测点在源系统的code
        },

		{
            'paramId':'0b645267-435c-4bb5-8566-0893284c58e0',
            'paramName':'1#焚烧炉蒸汽压力',
            'paramUnit':'mpa',
			'paramType':'生产',
            'tag':'Applications.BurningLine1.PRA_010B',  //测点在源系统的code
        },

		{
            'paramId':'5bad3706-0f80-451c-8cdb-5d9691ceb19e',
            'paramName':'1#垃圾抓斗重量',
            'paramUnit':'t',
			'paramType':'能耗',
            'tag':'Applications.CommonParts.LJDC_AI012',  //测点在源系统的code
        },

        {
            'paramId':'114d6465-5327-42aa-b4cf-8879331b3f54',
            'paramName':'1#垃圾抓斗皮量',
            'paramUnit':'t',
			'paramType':'能耗',
            'tag':'Applications.CommonParts.LJDC_AI034',  //测点在源系统的code
        },

		{
            'paramId':'3c33a86d-857e-441b-8cbe-2371bae44b86',
            'paramName':'2#焚烧炉1#给水泵电流',
            'paramUnit':'A',
			'paramType':'原料',
            'tag':'Applications.TurbineParts.GB1_CE',  //测点在源系统的code
        },

		{
            'paramId':'bc11c1af-b3b2-4dca-bf65-4b99d25a1862',
            'paramName':'2#焚烧炉2#给水泵电流',
            'paramUnit':'A',
			'paramType':'原料',
            'tag':'Applications.TurbineParts.GB2_CE',  //测点在源系统的code
        },

		{
            'paramId':'f2f80f38-5677-485c-8039-2bfd437d8bb8',
            'paramName':'2#焚烧炉3#给水泵电流',
            'paramUnit':'A',
			'paramType':'原料',
            'tag':'Applications.TurbineParts.GB3_CE',  //测点在源系统的code
        },

		{
            'paramId':'04ed4c0f-708a-418d-9087-ca57c5f72db3',
            'paramName':'2#焚烧炉SCR氨水调节阀开度',
            'paramUnit':'%',
			'paramType':'治理',
            'tag':'SCR2..M_AI_003',  //测点在源系统的code
        },

		{
            'paramId':'2edcabd8-3e46-48c2-88be-98a445fa9011',
            'paramName':'2#焚烧炉SCR反应器出口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'SCR2..M_TI_004',  //测点在源系统的code
        },

		{
            'paramId':'51b6401d-467e-4b89-9c5b-330c9745ebd3',
            'paramName':'2#焚烧炉SCR反应器入口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'SCR2..M_TI_003',  //测点在源系统的code
        },

		{
            'paramId':'b7803041-a60f-43fa-9641-96dfcd0d8acd',
            'paramName':'2#焚烧炉SNCR氨水流量',
            'paramUnit':'t/h',
			'paramType':'治理',
            'tag':'SNCR..FI_201_AI',  //测点在源系统的code
        },

		{
            'paramId':'2ad92c1c-baaa-4deb-bb9c-d99c5074b424',
            'paramName':'2#焚烧炉SNCR氨水压力',
            'paramUnit':'mpa',
			'paramType':'治理',
            'tag':'SNCR..PI_201_AI',  //测点在源系统的code
        },

		{
            'paramId':'c46a5a11-2fc0-48b2-9d9d-53e6366067e9',
            'paramName':'2#焚烧炉SNCR除盐水流量',
            'paramUnit':'t/h',
			'paramType':'治理',
            'tag':'SNCR..FI_202_AI',  //测点在源系统的code
        },

		{
            'paramId':'3dfc8d36-ba12-4a24-9b0b-946f01170903',
            'paramName':'2#焚烧炉半干法脱硫进口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.TR_051',  //测点在源系统的code
        },

		{
            'paramId':'bc04a396-8ef1-4409-a246-6a738dd9dacb',
            'paramName':'2#焚烧炉半干法脱硫进口烟气压力',
            'paramUnit':'pa',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.PI_051',  //测点在源系统的code
        },

		{
            'paramId':'054f630f-4542-4818-b8ae-d252785d4c55',
            'paramName':'2#焚烧炉除尘器出口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.TR_053',  //测点在源系统的code
        },

		{
            'paramId':'7375b1d8-8308-4216-b326-3c3798b5cf52',
            'paramName':'2#焚烧炉除尘器进口烟气温度',
            'paramUnit':'°C',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.TRCA_052',  //测点在源系统的code
        },

		{
            'paramId':'45f52439-1aad-4def-8208-0572aab736af',
            'paramName':'2#焚烧炉除尘器压差',
            'paramUnit':'pa',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.PDI_053',  //测点在源系统的code
        },

		{
            'paramId':'d65e9bcd-9f20-4020-acb8-ba0b13688105',
            'paramName':'2#焚烧炉点火燃烧器燃料流量',
            'paramUnit':'kg/h',
			'paramType':'能耗',
            'tag':'Applications.BurningLine2.RY_FI_RSQ02',  //测点在源系统的code
        },

		{
            'paramId':'02d3084d-92b5-46cf-8dff-41e15aa77768',
            'paramName':'2#焚烧炉二次风机电流',
            'paramUnit':'A',
			'paramType':'能耗',
            'tag':'Applications.BurningLine2.RF_CE1',  //测点在源系统的code
        },

		{
            'paramId':'996ef1d1-433b-4f4f-a10b-ff8a9f0608b7',
            'paramName':'2#焚烧炉辅助燃烧器燃料流量',
            'paramUnit':'kg/h',
			'paramType':'能耗',
            'tag':'Applications.BurningLine2.RY_FI_RSQ04',  //测点在源系统的code
        },

		{
            'paramId':'5dda283a-a1f1-4f20-a84d-6c0bb07121a7',
            'paramName':'2#焚烧炉给水流量',
            'paramUnit':'t/h',
			'paramType':'原料',
            'tag':'Applications.BurningLine2.FRCQ_001COM',  //测点在源系统的code
        },

		{
            'paramId':'3e255aec-49b0-4312-91c1-ce772a31fcb2',
            'paramName':'2#焚烧炉给水温度',
            'paramUnit':'°C',
			'paramType':'原料',
            'tag':'Applications.BurningLine2.TRA_001',  //测点在源系统的code
        },

		{
            'paramId':'f6146018-23f1-40ac-b31f-04bce0c602b1',
            'paramName':'2#焚烧炉给水压力',
            'paramUnit':'mpa',
			'paramType':'原料',
            'tag':'Applications.BurningLine2.PRA_001',  //测点在源系统的code
        },

		{
            'paramId':'c69922cd-4c2d-43a7-a010-635451a171bc',
            'paramName':'2#焚烧炉活性炭流量',
            'paramUnit':'kg/h',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.HXT01_SJLL',  //测点在源系统的code
        },

		{
            'paramId':'0a1f1ca7-88d6-4d46-bbb4-dc3c35bee6c5',
            'paramName':'2#焚烧炉炉内干法称重仓重量',
            'paramUnit':'kg',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.GF2_SSZL_WI',  //测点在源系统的code
        },

		{
            'paramId':'e4bab47e-baf6-43e6-91bb-3b43fb4c653b',
            'paramName':'2#焚烧炉炉内干法粉料累计',
            'paramUnit':'kg',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.GF2_SSZL_ACC',  //测点在源系统的code
        },

		{
            'paramId':'67346c4f-d890-40c0-adea-e9697f63c589',
            'paramName':'2#焚烧炉炉内干法粉料流量',
            'paramUnit':'kg/h',
			'paramType':'治理',
            'tag':'Applications.BurningLine1.GF2_Speed_h',  //测点在源系统的code
        },

		{
            'paramId':'07ca3a3e-5297-467f-a634-366818f13d10',
            'paramName':'2#焚烧炉炉膛压力',
            'paramUnit':'pa',
			'paramType':'能耗',
            'tag':'Applications.BurningLine2.PRCA_019L',  //测点在源系统的code
        },

		{
            'paramId':'8bee808d-f405-4349-9372-cc6587a99330',
            'paramName':'2#焚烧炉雾化器石灰浆液流量',
            'paramUnit':'t/h',
			'paramType':'治理',
            'tag':'WHQ2..FI_001_AI',  //测点在源系统的code
        },

		{
            'paramId':'4a12f92f-b5bd-482f-a77b-183b1be67603',
            'paramName':'2#焚烧炉雾化器转速',
            'paramUnit':'rpm',
			'paramType':'治理',
            'tag':'WHQ2...WHDJ_CS1_AI',  //测点在源系统的code
        },

		{
            'paramId':'e2c35273-0078-419b-8d52-cb56071e0d35',
            'paramName':'2#焚烧炉一次风机电流',
            'paramUnit':'A',
			'paramType':'能耗',
            'tag':'Applications.BurningLine2.GF_CE1',  //测点在源系统的code
        },

		{
            'paramId':'2239a32f-64d8-409e-858c-99f238944957',
            'paramName':'2#焚烧炉一次风流量',
            'paramUnit':'m³/h',
			'paramType':'能耗',
            'tag':'Applications.BurningLine2.FRQ_007COM',  //测点在源系统的code
        },

		{
            'paramId':'26a143a5-a091-4d5e-9379-1d9b06f080cf',
            'paramName':'2#焚烧炉引风机电流',
            'paramUnit':'A',
			'paramType':'治理',
            'tag':'Applications.BurningLine2.YF_CE',  //测点在源系统的code
        },

		{
            'paramId':'24c98414-f3dd-411b-9637-58e0593a9e8b',
            'paramName':'2#焚烧炉蒸汽流量',
            'paramUnit':'t/h',
			'paramType':'生产',
            'tag':'Applications.BurningLine2.FRCQ_004COM',  //测点在源系统的code
        },

		{
            'paramId':'d07e5eff-c9d2-4a96-a74e-c86af4f2ac00',
            'paramName':'2#焚烧炉蒸汽温度',
            'paramUnit':'°C',
			'paramType':'生产',
            'tag':'Applications.BurningLine2.TRCA_010',  //测点在源系统的code
        },

		{
            'paramId':'00915267-696b-4eba-a15f-262abad2563e',
            'paramName':'2#焚烧炉蒸汽压力',
            'paramUnit':'mpa',
			'paramType':'生产',
            'tag':'Applications.BurningLine2.PRA_010B',  //测点在源系统的code
        },

		{
            'paramId':'a0f92b30-c62d-44ec-a231-30a175bbe936',
            'paramName':'2#垃圾抓斗皮重',
            'paramUnit':'t',
			'paramType':'能耗',
            'tag':'Applications.CommonParts.LJDC_AI078',  //测点在源系统的code
        },

		{
            'paramId':'189ee89c-06cd-4a50-8935-658de63be928',
            'paramName':'2#垃圾抓斗重量',
            'paramUnit':'t',
			'paramType':'能耗',
            'tag':'Applications.CommonParts.LJDC_AI056',  //测点在源系统的code
        },

		{
            'paramId':'351f75a3-96c4-47c3-861e-a8a09f965459',
            'paramName':'发电机有功功率',
            'paramUnit':'mw',
			'paramType':'生产',
            'tag':'Applications.CommonParts.DEH_AI_04',  //测点在源系统的code
        },

		{
            'paramId':'30a451f4-0b67-4190-adeb-489804d89f94',
            'paramName':'汽轮机进蒸汽流量',
            'paramUnit':'t/h',
			'paramType':'能耗',
            'tag':'Applications.TurbineParts.FRQ_4101COM',  //测点在源系统的code
        },

		{
            'paramId':'f2b700eb-18a9-44cd-b149-adefed74333f',
            'paramName':'汽轮机进蒸汽温度',
            'paramUnit':'°C',
			'paramType':'能耗',
            'tag':'Applications.TurbineParts.TRA_4101',  //测点在源系统的code
        },

		{
            'paramId':'36116fa6-1796-40fc-9686-54ddeb48f219',
            'paramName':'汽轮机进蒸汽压力',
            'paramUnit':'mpa',
			'paramType':'能耗',
            'tag':'Applications.TurbineParts.PRA_4104',  //测点在源系统的code
        },

		{
            'paramId':'f3107e25-b76d-46f3-8662-2e7e8ef5e348',
            'paramName':'汽轮机转速',
            'paramUnit':'rpm',
			'paramType':'能耗',
            'tag':'Applications.TurbineParts.SIA_4307',  //测点在源系统的code
        },
    ];

    //省平台DCS配置文件
    config.dcsTags = [
        {
            'itemCode': 'GL_LTSBWDT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_018L',  //测点在源系统的code
            'cnName': '1#炉膛内上部断面左墙温度（T10）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTSBWDT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_018L',  //测点在源系统的code
            'cnName': '2#炉膛内上部断面左墙温度（T10）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_018M',  //测点在源系统的code
            'cnName': '1#炉膛内上部断面前墙温度（T11）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTSBWDT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_018M',  //测点在源系统的code
            'cnName': '2#炉膛内上部断面前墙温度（T11）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTSBWDT12',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_018R',  //测点在源系统的code
            'cnName': '1#炉膛内上部断面右墙温度（T12）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTSBWDT12',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_018R',  //测点在源系统的code
            'cnName': '2#炉膛内上部断面右墙温度（T12）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT20',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_017L',  //测点在源系统的code
            'cnName': '1#炉膛内中部断面左墙温度（T20）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTZBWDT20',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_017L',  //测点在源系统的code
            'cnName': '2#炉膛内中部断面左墙温度（T20）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT21',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_017M',  //测点在源系统的code
            'cnName': '1#炉膛内中部断面前墙温度（T21）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTZBWDT21',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_017M',  //测点在源系统的code
            'cnName': '2#炉膛内中部断面前墙温度（T21）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTZBWDT22',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_017R',  //测点在源系统的code
            'cnName': '1#炉膛内中部断面右墙温度（T22）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTZBWDT22',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_017R',  //测点在源系统的code
            'cnName': '2#炉膛内中部断面右墙温度（T22）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT30',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_016L',  //测点在源系统的code
            'cnName': '1#炉膛内下部断面左墙温度（T30）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTXBWDT30',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_016L',  //测点在源系统的code
            'cnName': '2#炉膛内下部断面左墙温度（T30）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT31',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_016M',  //测点在源系统的code
            'cnName': '1#炉膛内下部断面前墙温度（T31）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTXBWDT31',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_016M',  //测点在源系统的code
            'cnName': '2#炉膛内下部断面前墙温度（T31）',  //测点中文名
        },
        {
            'itemCode': 'GL_LTXBWDT32',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_016R',  //测点在源系统的code
            'cnName': '1#炉膛内下部断面右墙温度（T32）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTXBWDT32',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_016R',  //测点在源系统的code
            'cnName': '2#炉膛内二次风喷入点温度',  //测点中文名
        },
        {
            'itemCode': 'GL_LTNECFPRDWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRA_015L',  //测点在源系统的code
            'cnName': '1#炉膛内二次风喷入点温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTNECFPRDWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRA_015L',  //测点在源系统的code
            'cnName': '2#炉膛内二次风喷入点温度',  //测点中文名
        },
        {
            'itemCode': 'GL_LTCKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRCA_019L',  //测点在源系统的code
            'cnName': '1#炉膛出口负压(左侧)',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTCKFY_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRCA_019L',  //测点在源系统的code
            'cnName': '2#炉膛出口负压(左侧)',  //测点中文名
        },
        {
            'itemCode': 'GL_LTCKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRCA_019R',  //测点在源系统的code
            'cnName': '1#炉膛出口负压(右侧)',  //测点中文名
        },
        {
            'itemCode': 'GL_2LLTCKFY_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRCA_019R',  //测点在源系统的code
            'cnName': '2#炉膛出口负压(右侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_PHRQSW_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.LRCZA_001A',  //测点在源系统的code
            'cnName': '1#炉汽包平衡容器水位(左侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LPHRQSW_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.LRCZA_001A',  //测点在源系统的code
            'cnName': '2#炉汽包平衡容器水位(左侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_PHRQSW_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.LRCZA_001B',  //测点在源系统的code
            'cnName': '1#炉汽包平衡容器水位(右侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LPHRQSW_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.LRCZA_001B',  //测点在源系统的code
            'cnName': '2#炉汽包平衡容器水位(右侧)',  //测点中文名
        },
        {
            'itemCode': 'LQB_LQBYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRCA_006A',  //测点在源系统的code
            'cnName': '1#炉汽包压力',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LLQBYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRCA_006A',  //测点在源系统的code
            'cnName': '2#炉汽包压力',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_ZS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_033A',  //测点在源系统的code
            'cnName': '1#汽包壁温（左上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LBW_2LZS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_033A',  //测点在源系统的code
            'cnName': '2#汽包壁温（左上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_YS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_035A',  //测点在源系统的code
            'cnName': '1#汽包壁温（右上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LBW_2LYS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_035A',  //测点在源系统的code
            'cnName': '2#汽包壁温（右上）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_ZX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_033B',  //测点在源系统的code
            'cnName': '1#汽包壁温（左下）',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LBW_2LZX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_033B',  //测点在源系统的code
            'cnName': '2#汽包壁温（左下）',  //测点中文名
        },
        {
            'itemCode': 'LQB_BW_YX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_035B',  //测点在源系统的code
            'cnName': '1#汽包壁温（右下）',  //测点中文名
        },
        {
            'itemCode': 'LQB_2LBW_2LYX',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_035B',  //测点在源系统的code
            'cnName': '2#汽包壁温（右下）',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRCA_010',  //测点在源系统的code
            'cnName': '1#主蒸汽温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2LZZQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRCA_010',  //测点在源系统的code
            'cnName': '2#主蒸汽温度',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PRA_010B',  //测点在源系统的code
            'cnName': '1#主蒸汽压力',  //测点中文名
        },
        {
            'itemCode': 'GL_2LZZQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PRA_010B',  //测点在源系统的code
            'cnName': '2#主蒸汽压力',  //测点中文名
        },
        {
            'itemCode': 'GL_ZZQLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.FRCQ_004COM',  //测点在源系统的code
            'cnName': '1#主蒸汽流量',  //测点中文名
        },
        {
            'itemCode': 'GL_2LZZQLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.FRCQ_004COM',  //测点在源系统的code
            'cnName': '2#主蒸汽流量',  //测点中文名
        },
        {
            'itemCode': 'GL_XKPQFZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HS_002_ZO',  //测点在源系统的code
            'cnName': '1#向空排汽阀状态',  //测点中文名
        },
        {
            'itemCode': 'GL_2LXKPQFZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HS_002_ZO',  //测点在源系统的code
            'cnName': '2#向空排汽阀状态',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_021L',  //测点在源系统的code
            'cnName': '1#高温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_2LRKYQWD_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_021L',  //测点在源系统的code
            'cnName': '2#高温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_021R',  //测点在源系统的code
            'cnName': '1#高温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_2LRKYQWD_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_021R',  //测点在源系统的code
            'cnName': '2#高温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_021L',  //测点在源系统的code
            'cnName': '1#高温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_2LRKFY_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_021L',  //测点在源系统的code
            'cnName': '2#高温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_021R',  //测点在源系统的code
            'cnName': '1#高温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GWGRQ_2LRKFY_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_021R',  //测点在源系统的code
            'cnName': '2#高温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_022L',  //测点在源系统的code
            'cnName': '1#中温过热器入口烟气温温（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_2LRKYQWD_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_022L',  //测点在源系统的code
            'cnName': '2#中温过热器入口烟气温温（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_022R',  //测点在源系统的code
            'cnName': '1#中温过热器入口烟气温温（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_2LRKYQWD_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_022R',  //测点在源系统的code
            'cnName': '2#中温过热器入口烟气温温（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_022L',  //测点在源系统的code
            'cnName': '1#中温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_2LRKFY_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_022L',  //测点在源系统的code
            'cnName': '2#中温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_022R',  //测点在源系统的code
            'cnName': '1#中温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'ZWGRQ_2LRKFY_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_022R',  //测点在源系统的code
            'cnName': '2#中温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_023L',  //测点在源系统的code
            'cnName': '1#低温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_2LRKYQWD_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_023L',  //测点在源系统的code
            'cnName': '2#低温过热器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_023R',  //测点在源系统的code
            'cnName': '1#低温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_2LRKYQWD_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_023R',  //测点在源系统的code
            'cnName': '2#低温过热器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_023L',  //测点在源系统的code
            'cnName': '1#低温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_2LRKFY_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_023L',  //测点在源系统的code
            'cnName': '2#低温过热器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_023R',  //测点在源系统的code
            'cnName': '1#低温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_2LRKFY_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_023R',  //测点在源系统的code
            'cnName': '2#低温过热器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKYQWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_024L',  //测点在源系统的code
            'cnName': '1#一级省煤器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_2LRKYQWD_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_024L',  //测点在源系统的code
            'cnName': '2#一级省煤器入口烟气温度（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_024R',  //测点在源系统的code
            'cnName': '1#一级省煤器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_2LRKYQWD_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_024R',  //测点在源系统的code
            'cnName': '2#一级省煤器入口烟气温度（右侧）',  //测点中文名
        },
        {
            'itemCode': 'DWGRQ_RKYQWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_024L',  //测点在源系统的code
            'cnName': '1#一级省煤器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_2LRKFY_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_024L',  //测点在源系统的code
            'cnName': '2#一级省煤器入口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_RKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_024R',  //测点在源系统的code
            'cnName': '1#一级省煤器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'YJSMQ_2LRKFY_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_024R',  //测点在源系统的code
            'cnName': '2#一级省煤器入口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_CKYHL_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ARCA_001L',  //测点在源系统的code
            'cnName': '1#锅炉出口氧含量（省煤器左侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LCKYHL_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ARCA_001L',  //测点在源系统的code
            'cnName': '2#锅炉出口氧含量（省煤器左侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_CKYHL_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ARCA_001R',  //测点在源系统的code
            'cnName': '1#锅炉出口氧含量（省煤器右侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LCKYHL_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ARCA_001R',  //测点在源系统的code
            'cnName': '2#锅炉出口氧含量（省煤器右侧出口氧量）',  //测点中文名
        },
        {
            'itemCode': 'GL_PYWD_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_025L',  //测点在源系统的code
            'cnName': '1#排烟温度（省煤器出口左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LPYWD_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_025L',  //测点在源系统的code
            'cnName': '2#排烟温度（省煤器出口左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_PYWD_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_025R',  //测点在源系统的code
            'cnName': '1#排烟温度（省煤器出口右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LPYWD_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_025R',  //测点在源系统的code
            'cnName': '2#排烟温度（省煤器出口右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_SMQCKFY_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_025L',  //测点在源系统的code
            'cnName': '1#省煤器出口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LSMQCKFY_2LL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_025L',  //测点在源系统的code
            'cnName': '2#省煤器出口负压（左侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_SMQCKFY_R',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PI_025R',  //测点在源系统的code
            'cnName': '1#省煤器出口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'GL_2LSMQCKFY_2LR',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PI_025R',  //测点在源系统的code
            'cnName': '2#省煤器出口负压（右侧）',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_RKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRCA_052',  //测点在源系统的code
            'cnName': '1#布袋除尘器入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_2LRKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRCA_052',  //测点在源系统的code
            'cnName': '2#布袋除尘器入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_YC',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.PDI_053',  //测点在源系统的code
            'cnName': '1#布袋除尘器压差',  //测点中文名
        },
        {
            'itemCode': 'BDCCQ_2LYC',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.PDI_053',  //测点在源系统的code
            'cnName': '2#布袋除尘器压差',  //测点中文名
        },
        {
            'itemCode': 'GL_HXTPSLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HXT01_SJLL',  //测点在源系统的code
            'cnName': '1#活性炭喷射流量',  //测点中文名
        },
        {
            'itemCode': 'GL_2LHXTPSLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HXT01_SJLL',  //测点在源系统的code
            'cnName': '2#活性炭喷射流量',  //测点中文名
        },
        {
            'itemCode': 'GL_HXTPSFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HXT01_YXXS',  //测点在源系统的code
            'cnName': '1#活性炭喷射风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_2LHXTPSFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HXT01_YXXS',  //测点在源系统的code
            'cnName': '2#活性炭喷射风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'TSFYT_RKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_051',  //测点在源系统的code
            'cnName': '1#脱酸反应塔入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'TSFYT_2LRKYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_051',  //测点在源系统的code
            'cnName': '2#脱酸反应塔入口烟气温度',  //测点中文名
        },
        {
            'itemCode': 'GLDLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_001',  //测点在源系统的code
            'cnName': '1#1段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2LDLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_001',  //测点在源系统的code
            'cnName': '2#1段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_002',  //测点在源系统的code
            'cnName': '1#2段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2L2DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_002',  //测点在源系统的code
            'cnName': '2#2段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_3DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_003',  //测点在源系统的code
            'cnName': '1#3段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2L3DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_003',  //测点在源系统的code
            'cnName': '2#3段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_4DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_TI_004',  //测点在源系统的code
            'cnName': '1#4段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_2L4DLPWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_TI_004',  //测点在源系统的code
            'cnName': '2#4段炉排温度',  //测点中文名
        },
        {
            'itemCode': 'GL_YQZXHFJCRKDB',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.HC_049_XV',  //测点在源系统的code
            'cnName': '1#烟气再循环风机出入口挡板',  //测点中文名
        },
        {
            'itemCode': 'GL_2LYQZXHFJCRKDB',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.HC_049_XV',  //测点在源系统的code
            'cnName': '2#烟气再循环风机出入口挡板',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_101',  //测点在源系统的code
            'cnName': '1#1列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_2LYYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_101',  //测点在源系统的code
            'cnName': '2#1列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_105',  //测点在源系统的code
            'cnName': '1#1列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP1_2LYYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_105',  //测点在源系统的code
            'cnName': '2#1列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_102',  //测点在源系统的code
            'cnName': '1#2列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_2LYYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_102',  //测点在源系统的code
            'cnName': '2#2列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_106',  //测点在源系统的code
            'cnName': '1#2列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP2_2LYYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_106',  //测点在源系统的code
            'cnName': '2#2列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_103',  //测点在源系统的code
            'cnName': '1#3列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_2LYYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_103',  //测点在源系统的code
            'cnName': '2#3列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_107',  //测点在源系统的code
            'cnName': '1#3列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP3_2LYYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_107',  //测点在源系统的code
            'cnName': '2#3列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_YYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_104',  //测点在源系统的code
            'cnName': '1#4列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_2LYYGZT10',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_104',  //测点在源系统的code
            'cnName': '2#4列1号给料炉排液压缸状态信号（退到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_YYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.ACCS_ZI_108',  //测点在源系统的code
            'cnName': '1#4列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'GLLP4_2LYYGZT11',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.ACCS_ZI_108',  //测点在源系统的code
            'cnName': '2#4列1号给料炉排液压缸状态信号（进到位）',  //测点中文名
        },
        {
            'itemCode': 'YFJ_DL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.YF_CE',  //测点在源系统的code
            'cnName': '1#炉引风机电流',  //测点中文名
        },

		{
            'itemCode': 'YFJ_2LDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.YF_CE',  //测点在源系统的code
            'cnName': '2#炉引风机电流',  //测点中文名
        },

		{
            'itemCode': 'YFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.YF_ZS',  //测点在源系统的code
            'cnName': '1#引风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YFJ_2LZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.YF_ZS',  //测点在源系统的code
            'cnName': '2#炉引风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.YF_CS1',  //测点在源系统的code
            'cnName': '1#炉引风机频率',  //测点中文名
        },

		{
            'itemCode': 'YFJ_2LDLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.YF_CS1',  //测点在源系统的code
            'cnName': '2#炉引风机频率',  //测点中文名
        },

		{
            'itemCode': 'YFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_072C',  //测点在源系统的code
            'cnName': '1#炉引风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'YFJ_2LXQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_072C',  //测点在源系统的code
            'cnName': '2#炉引风机线圈温度',  //测点中文名
        },


		{
            'itemCode': 'YFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_072A',  //测点在源系统的code
            'cnName': '1#炉引风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'YFJ_2LZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_072A',  //测点在源系统的code
            'cnName': '2#炉引风机轴承温度（主动侧/从动侧）',  //测点中文名
        },


		{
            'itemCode': 'YCFJ_YXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.GF_CE1',  //测点在源系统的code
            'cnName': '1#炉一次风机运行电流',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LYXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.GF_CE1',  //测点在源系统的code
            'cnName': '2#炉一次风机运行电流',  //测点中文名
        },


		{
            'itemCode': 'YCFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.GF_ZS1',  //测点在源系统的code
            'cnName': '1#炉一次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.GF_ZS1',  //测点在源系统的code
            'cnName': '2#炉一次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.GF_CS1',  //测点在源系统的code
            'cnName': '1#炉一次风机电流频率',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LDLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.GF_CS1',  //测点在源系统的code
            'cnName': '2#炉一次风机电流频率',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_071C',  //测点在源系统的code
            'cnName': '1#炉一次风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LXQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_071C',  //测点在源系统的code
            'cnName': '2#炉一次风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_071A',  //测点在源系统的code
            'cnName': '1#炉一次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_071A',  //测点在源系统的code
            'cnName': '2#炉一次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_FL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.FRQ_007COM',  //测点在源系统的code
            'cnName': '1#炉一次风机风量',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LFL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.FRQ_007COM',  //测点在源系统的code
            'cnName': '2#炉一次风机风量',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_FW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_045A',  //测点在源系统的code
            'cnName': '1#炉一次风温度',  //测点中文名
        },

		{
            'itemCode': 'YCFJ_2LFW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_045A',  //测点在源系统的code
            'cnName': '2#炉一次风温度',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_YXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.RF_CE1',  //测点在源系统的code
            'cnName': '1#炉二次风机运行电流',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_2LYXDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.RF_CE1',  //测点在源系统的code
            'cnName': '2#炉二次风机运行电流',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_ZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.RF_ZS1',  //测点在源系统的code
            'cnName': '1#炉二次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_2LZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.RF_ZS1',  //测点在源系统的code
            'cnName': '2#炉二次风机状态信号',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_DLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.RF_CS1',  //测点在源系统的code
            'cnName': '1#炉二次风机电流频率',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_2LDLPLV',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.RF_CS1',  //测点在源系统的code
            'cnName': '2#炉二次风机电流频率',  //测点中文名
        },


		{
            'itemCode': 'ECFJ_XQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_070C',  //测点在源系统的code
            'cnName': '1#炉二次风机线圈温度',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_2LXQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_070C',  //测点在源系统的code
            'cnName': '2#炉二次风机线圈温度',  //测点中文名
        },


		{
            'itemCode': 'ECFJ_ZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TRZA_070A',  //测点在源系统的code
            'cnName': '1#炉二次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_2LZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TRZA_070A',  //测点在源系统的code
            'cnName': '2#炉二次风机轴承温度（主动侧/从动侧）',  //测点中文名
        },


		{
            'itemCode': 'ECFJ_FW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.TR_046E',  //测点在源系统的code
            'cnName': '1#炉二次风温度',  //测点中文名
        },

		{
            'itemCode': 'ECFJ_2LFW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.TR_046E',  //测点在源系统的code
            'cnName': '2#炉二次风温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_JQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRA_4101',  //测点在源系统的code
            'cnName': '汽机进汽温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_JQLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.FRQ_4101COM',  //测点在源系统的code
            'cnName': '汽机进汽流量',  //测点中文名
        },


		{
            'itemCode': 'QJ_JQL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.FRQ_4101COM_ACC',  //测点在源系统的code
            'cnName': '汽机进汽量(累积值)',  //测点中文名
        },

		{
            'itemCode': 'QJ_FDJGL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.DEH_AI_04',  //测点在源系统的code
            'cnName': '汽机发电机功率',  //测点中文名
        },


		{
            'itemCode': 'QJ_QJZS',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SIA_4307',  //测点在源系统的code
            'cnName': '汽机转速',  //测点中文名
        },

		{
            'itemCode': 'QJ_QJETSZS_A',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SIA_4304',  //测点在源系统的code
            'cnName': '汽机ETS转速A',  //测点中文名
        },


		{
            'itemCode': 'QJ_QJETSZS_B',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SIA_4305',  //测点在源系统的code
            'cnName': '汽机ETS转速B',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRA_4104',  //测点在源系统的code
            'cnName': '汽机主汽压力',  //测点中文名
        },


		{
            'itemCode': 'QJ_1TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4213',  //测点在源系统的code
            'cnName': '#1推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4214',  //测点在源系统的code
            'cnName': '#2推力瓦温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_3TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4215',  //测点在源系统的code
            'cnName': '#3推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_4TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4216',  //测点在源系统的code
            'cnName': '#4推力瓦温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_5TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4240',  //测点在源系统的code
            'cnName': '#5推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_6TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4241',  //测点在源系统的code
            'cnName': '#6推力瓦温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_7TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4242',  //测点在源系统的code
            'cnName': '#7推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_8TLWWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4243',  //测点在源系统的code
            'cnName': '#8推力瓦温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_1WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4211',  //测点在源系统的code
            'cnName': '#1瓦轴承温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4212',  //测点在源系统的code
            'cnName': '#2瓦轴承温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_1WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4217',  //测点在源系统的code
            'cnName': '#1瓦轴承温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WZCWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4218',  //测点在源系统的code
            'cnName': '#2瓦轴承温度',  //测点中文名
        },


		{
            'itemCode': 'QJ_1WHYWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4226',  //测点在源系统的code
            'cnName': '#1瓦回油温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WHYWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TRZA_4227',  //测点在源系统的code
            'cnName': '#2瓦回油温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_1WZD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GIA_4201',  //测点在源系统的code
            'cnName': '#1瓦振动',  //测点中文名
        },

		{
            'itemCode': 'QJ_2WZD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GIA_4202',  //测点在源系统的code
            'cnName': '#2瓦振动',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZC',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GdIA_4209',  //测点在源系统的code
            'cnName': '胀差',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZXWY',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.GIA_4210',  //测点在源系统的code
            'cnName': '轴向位移',  //测点中文名
        },

		{
            'itemCode': 'QJ_YJCQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4116',  //测点在源系统的code
            'cnName': '一级抽气压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_YJCQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4116',  //测点在源系统的code
            'cnName': '一级抽气压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_YJCQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_4114',  //测点在源系统的code
            'cnName': '一级抽气温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_EJCQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4118',  //测点在源系统的code
            'cnName': '二级抽气压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_EJCQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_4115',  //测点在源系统的code
            'cnName': '二级抽气温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_QLJZK',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRA_4160_QJ',  //测点在源系统的code
            'cnName': '汽轮机真空',  //测点中文名
        },

		{
            'itemCode': 'QJ_RHYY',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4222',  //测点在源系统的code
            'cnName': '润滑油压',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZYXYW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.LIA_4201',  //测点在源系统的code
            'cnName': '主油箱油位',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZYBCKYY',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PI_4222',  //测点在源系统的code
            'cnName': '主油泵出口油压',  //测点中文名
        },

		{
            'itemCode': 'QJ_CYQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRCA_0219',  //测点在源系统的code
            'cnName': '除氧器压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_CYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_0212',  //测点在源系统的code
            'cnName': '除氧器温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.FRQ_4102COM',  //测点在源系统的code
            'cnName': '凝结水流量',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.TI_4151',  //测点在源系统的code
            'cnName': '凝结水温度',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PRCZA_4140',  //测点在源系统的code
            'cnName': '凝结水压力',  //测点中文名
        },

		{
            'itemCode': 'QJ_JLYBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SGBJ_SGYB_RUN_OUT',  //测点在源系统的code
            'cnName': '交流油泵运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZLYBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SGBJ_ZLYB_RUN_OUT',  //测点在源系统的code
            'cnName': '直流油泵运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_JLYBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.JLRHYB1_CE',  //测点在源系统的code
            'cnName': '交流油泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZLYBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.ZLYB1_CE',  //测点在源系统的code
            'cnName': '直流油泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_PCYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PCJAC1_ZS',  //测点在源系统的code
            'cnName': '盘车运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_PCDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.PCJAC1_CE',  //测点在源系统的code
            'cnName': '盘车电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_ZKBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SHZKB1_ZS',  //测点在源系统的code
            'cnName': '真空泵运行状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_SSBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SHZKB1_CE',  //测点在源系统的code
            'cnName': '真空泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSBDL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.NJB1_CE1',  //测点在源系统的code
            'cnName': '凝结水泵电流',  //测点中文名
        },

		{
            'itemCode': 'QJ_NJSBZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.SGBJ_NJB1_RUN_OUT',  //测点在源系统的code
            'cnName': '凝结水泵状态',  //测点中文名
        },

		{
            'itemCode': 'QJ_RJSW',  //测点在管控平台的CODE
            'sourceCode': 'Applications.TurbineParts.LRCZA_4101',  //测点在源系统的code
            'cnName': '热井水位',  //测点中文名
        },

		{
            'itemCode': 'LJC_ZDDCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.LJDC_AI012',  //测点在源系统的code
            'cnName': '1#抓斗吊称重',  //测点中文名
        },

        {
            'itemCode': 'LJC_ZDDCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.LJDC_AI056',  //测点在源系统的code
            'cnName': '2#抓斗吊称重',  //测点中文名
        },

		{
            'itemCode': 'LJC_LJCFY_A',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.PRZA_0101',  //测点在源系统的code
            'cnName': '垃圾池负压A信号',  //测点中文名
        },

		{
            'itemCode': 'LJC_CCFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.CCFJ_ZS',  //测点在源系统的code
            'cnName': '垃圾池除臭风机运行状态',  //测点中文名
        },

		{
            'itemCode': 'YQ_DUST_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_Dust',  //测点在源系统的code
            'cnName': '1#炉粉尘实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_2LDUST_2LSCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_Dust',  //测点在源系统的code
            'cnName': '2#炉粉尘实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_HCL_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_HCL',  //测点在源系统的code
            'cnName': '1#炉HCL实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_2LHCL_2LSCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_HCL',  //测点在源系统的code
            'cnName': '2#炉HCL实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_SO2_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_SO2',  //测点在源系统的code
            'cnName': '1#炉SO2实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_2LSO2_2LSCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_SO2',  //测点在源系统的code
            'cnName': '2#炉SO2实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_NOX_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_NOX',  //测点在源系统的code
            'cnName': '1#炉NOx实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_2LNOX_2LSCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_NOX',  //测点在源系统的code
            'cnName': '2#炉NOx实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_CO_SCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_CO',  //测点在源系统的code
            'cnName': '1#炉CO实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_2LCO_2LSCZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_CO',  //测点在源系统的code
            'cnName': '2#炉CO实测实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_DUST_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_Dust_ZS',  //测点在源系统的code
            'cnName': '1#炉粉尘_折算实时值',  //测点中文名
        },

		{
            'itemCode': 'YQ_2LDUST_2LZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_Dust_ZS',  //测点在源系统的code
            'cnName': '2#炉粉尘_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_HCL_ZS',  //测点在源系统的code
            'cnName': '1#炉HCL_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LHCL_2LZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_HCL_ZS',  //测点在源系统的code
            'cnName': '2#炉HCL_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_SO2_ZS',  //测点在源系统的code
            'cnName': '1#炉SO2_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LSO2_2LZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_SO2_ZS',  //测点在源系统的code
            'cnName': '2#炉SO2_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_NOX_ZS',  //测点在源系统的code
            'cnName': '1#炉NOx_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LNOX_2LZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_NOX_ZS',  //测点在源系统的code
            'cnName': '2#炉NOx_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_ZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine1.Scy_CO_ZS',  //测点在源系统的code
            'cnName': '1#炉CO_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LCO_2LZSZ',  //测点在管控平台的CODE
            'sourceCode': 'Applications.BurningLine2.Scy_CO_ZS',  //测点在源系统的code
            'cnName': '2#炉CO_折算实时值',  //测点中文名
        },
		{
            'itemCode': 'YQ_YL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_O2',  //测点在源系统的code
            'cnName': '1#炉氧量',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_O2',  //测点在源系统的code
            'cnName': '2#炉氧量',  //测点中文名
        },

		{
            'itemCode': 'YQ_YQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_PRESS',  //测点在源系统的code
            'cnName': '1#炉烟气压力',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LYQYL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_PRESS',  //测点在源系统的code
            'cnName': '2#炉烟气压力',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQSD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_H2O',  //测点在源系统的code
            'cnName': '1#炉烟气湿度',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LYQSD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_H2O',  //测点在源系统的code
            'cnName': '2#炉烟气湿度',  //测点中文名
        },
		{
            'itemCode': 'YQ_YQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_TEMP',  //测点在源系统的code
            'cnName': '1#炉烟气温度',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LYQWD',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_TEMP',  //测点在源系统的code
            'cnName': '2#炉烟气温度',  //测点中文名
        },
		{
            'itemCode': 'YQ_DUST_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_Dust_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉粉尘(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LDUST_2LHAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_Dust_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉粉尘(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_DUST_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_Dust_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉粉尘(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LDUST_2LDAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_Dust_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉粉尘(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_HCL_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉HCL(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LHCL_2LHAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_HCL_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉HCL(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_HCL_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_HCL_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉HCL(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LHCL_2LDAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_HCL_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉HCL(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_NOX_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉NOx(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LNOX_2LHAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_NOX_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉NOx(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_NOX_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_NOX_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉NOx(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LNOX_2LDAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_NOX_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉NOx(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_CO_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉CO(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LCO_2LHAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_CO_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉CO(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_CO_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_CO_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉CO(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LCO_2LDAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_CO_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉CO(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_HAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_SO2_ZS_Hg',  //测点在源系统的code
            'cnName': '1#炉SO2(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LSO2_2LHAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_SO2_ZS_Hg',  //测点在源系统的code
            'cnName': '2#炉SO2(时均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_SO2_DAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy1_SO2_ZS_Dg',  //测点在源系统的code
            'cnName': '1#炉SO2(日均值)',  //测点中文名
        },
		{
            'itemCode': 'YQ_2LSO2_2LDAVG',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.Scy2_SO2_ZS_Dg',  //测点在源系统的code
            'cnName': '2#炉SO2(日均值)',  //测点中文名
        },
		{
            'itemCode': 'SLY_SLYCYW_L',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.LIZA_0001',  //测点在源系统的code
            'cnName': '垃圾渗滤液池液位左信号（调节池',  //测点中文名
        },
		{
            'itemCode': 'SLY_SLYBCKMGLL',  //测点在管控平台的CODE
            'sourceCode': 'Applications.CommonParts.FRQ_0001',  //测点在源系统的code
            'cnName': '垃圾渗滤液泵出口母管流量',  //测点中文名
        },
        //以下为500点位
        {
            'itemCode': 'GL_SHJLL',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..FI_001_AI',  //测点在源系统的code
            'cnName': '1#石灰浆流量',  //测点中文名
        },
        {
            'itemCode': 'GL_2LSHJLL',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..FI_001_AI',  //测点在源系统的code
            'cnName': '2#石灰浆流量',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZS',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..WHDJ_CS1_AI',  //测点在源系统的code
            'cnName': '1#雾化器转速',  //测点中文名
        },
        {
            'itemCode': 'GL_2LWHQZS',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..WHDJ_CS1_AI',  //测点在源系统的code
            'cnName': '2#雾化器转速',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQYXZT',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..WHDJ_Run',  //测点在源系统的code
            'cnName': '1#雾化器运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_2LWHQZD',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..WHDJ_Run',  //测点在源系统的code
            'cnName': '2#雾化器运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_WHQZD',  //测点在管控平台的CODE
            'sourceCode': 'WHQ1..BSQ_ZI_AI',  //测点在源系统的code
            'cnName': '1#雾化器振动',  //测点中文名
        },
        {
            'itemCode': 'GL_2LWHQZD',  //测点在管控平台的CODE
            'sourceCode': 'WHQ2..BSQ_ZI_AI',  //测点在源系统的code
            'cnName': '2#雾化器振动',  //测点中文名
        },
        {
            'itemCode': 'GL_SHJBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SHZJ..ZJB1_Run',  //测点在源系统的code
            'cnName': '1#石灰浆泵运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_2LSHJBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SHZJ..ZJB2_Run',  //测点在源系统的code
            'cnName': '2#石灰浆泵2运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_GFFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'GFTS1..B1_Run',  //测点在源系统的code
            'cnName': '1#干法风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_2LGFFJYXZT',  //测点在管控平台的CODE
            'sourceCode': 'GFTS2..B1_Run',  //测点在源系统的code
            'cnName': '2#干法风机运行状态',  //测点中文名
        },
        {
            'itemCode': 'GL_SNCRHYJPSBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..B1_Run',  //测点在源系统的code
            'cnName': 'SNCR还原剂喷射泵运行状态',  //测点中文名
        },
		{
            'itemCode': 'GL_2LSNCRHYJPSBYXZT',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..B2_Run',  //测点在源系统的code
            'cnName': 'SNCR还原剂喷射泵2运行状态',  //测点中文名
        },
		{
            'itemCode': 'GL_SNCRHYJPSLL',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..FI_001_AI',  //测点在源系统的code
            'cnName': 'SNCR还原剂喷射流量',  //测点中文名
        },
		{
            'itemCode': 'GL_SNCRHYJPSBCKYL',  //测点在管控平台的CODE
            'sourceCode': 'SNCR..PI_001_AI',  //测点在源系统的code
            'cnName': 'SNCR还原剂喷射泵出口压力',  //测点中文名
        }
    ];

    return {
        ...config,
        ...userConfig,
    };
};
