module.exports = app => {
    const mongoose = app.mongoose;

    const CityDcsSchema = new mongoose.Schema({
        tag: {
            type: String,
            required: [ true, 'tag 是必须的' ] //设备Code，设备类型 + 设备编码. 同deviceId
        },
        value: {
            type: Number,
            required: [ true, 'value 是必须的' ] //指标数值
        },
        datetime: {
            type: Number,
            required: [ true, 'datetime 是必须的' ] //指标采集时间戳。unix时间戳，单位 毫秒
        },
        paramId: {
            type: String,
        },
        paramType: {
            type: String,
        },
        paramUnit: {
            type: String,
        },
        result: {
            type: String //上报返回结果
        },
        flag: {
            type: String,
            enum: ['success', 'fail', 'init'], //上报状态
            default: 'init'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        deletetime: {
            type: Date,
            default: null
        }
    });

    return mongoose.model('CityDcs', CityDcsSchema, "city_dcs");
};
