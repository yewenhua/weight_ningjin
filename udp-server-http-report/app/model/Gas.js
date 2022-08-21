module.exports = app => {
    const mongoose = app.mongoose;

    const GasSchema = new mongoose.Schema({
        tag: {
            type: String,
            required: [ true, 'tag 是必须的' ] //设备Code，设备类型 + 设备编码. 同deviceId
        },
        value: {
            type: String,
            required: [ true, 'value 是必须的' ] //指标数值
        },
        datetime: {
            type: Number,
            required: [ true, 'acquisitionDatetime 是必须的' ] //指标采集时间戳。unix时间戳，单位 毫秒
        },
        cn_name: {
            type: String,
            required: [ true, '设备中文名称是必须的' ]
        },
        code: {
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

    return mongoose.model('Gas', GasSchema, "gas");
};
