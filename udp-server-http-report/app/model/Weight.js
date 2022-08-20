module.exports = app => {
    const mongoose = app.mongoose;

    const WeightSchema = new mongoose.Schema({
        partnerId: {
            type: String,
            required: [ true, 'partnerId 是必须的' ] //第二个参数是错误提示信息
        },
        weightId: {
            type: Number,
            required: [ true, 'weightId 是必须的' ]
        },
        weighType: {
            type: Number,
            required: [ true, 'weighType 是必须的' ]
        },
        weighNo: {
            type: String,
            required: [ true, 'weighNo 是必须的' ]
        },
        weighName: {
            type: String,
            required: [ true, 'weighName 是必须的' ]
        },
        icCard: {
            type: String
        },
        garbageType: {
            type: Number,
            required: [ true, 'garbageType 是必须的' ]
        },
        weight: {
            type: Number,
            required: [ true, 'weight 是必须的' ]
        },
        unit: {
            type: Number,
            required: [ true, 'unit 是必须的' ]
        },
        time: {
            type: Date,
            required: [ true, 'time 是必须的' ]
        },
        weightMode: {
            type: Number
        },
        weight2: {
            type: Number
        },
        time2: {
            type: Date
        },
        weightMode2: {
            type: Number
        },
        status: {
            type: Number,
            required: [ true, '状态是必须的' ]
        },
        garbageSource: {
            type: String
        },
        result: {
            type: String
        },
        flag: {
            type: String,
            enum: ['success', 'fail', 'init'],
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

    return mongoose.model('Weight', WeightSchema, "weight");
};
