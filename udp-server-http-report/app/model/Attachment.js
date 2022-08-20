module.exports = app => {
    const mongoose = app.mongoose;

    const AttachmentSchema = new mongoose.Schema({
        extname: {
            type: String,
            required: [ true, 'extname 是必须的' ] //第二个参数是错误提示信息
        },
        url: {
            type: String,
            required: [ true, 'url 是必须的' ]
        },
        filename: {
            type: String,
            required: [ true, 'filename 是必须的' ]
        },
        extra: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Attachment', AttachmentSchema);
};
