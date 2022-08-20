const moment = require('moment');
const crypto = require('crypto');

// 格式化时间
exports.formatTime = time => moment(time)
    .format('YYYY-MM-DD HH:mm:ss');

exports.formatDateFolder = time => moment(time)
    .format('YYYYMMDD');

exports.md5 = (str) => {
    var obj = crypto.createHash('md5');
    obj.update(str);
    var res = obj.digest('hex');
    return res;
};

exports.parseInt = (str) => {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
};

exports.parseMsg = (action, payload = {}, metadata = {}) => {
    const meta = Object.assign({}, {
        timestamp: Date.now(),
    }, metadata);

    return {
        meta,
        data: {
            action,
            payload,
        },
    };
};

exports.success = ( ctx, msg, data ) => {
    ctx.body = {
        code: 0,
        msg,
        data,
    };
    ctx.status = 200;
};

// 处理失败，需要传入失败原因
exports.fail = ( ctx, msg, data ) => {
    ctx.body = {
        code: -1,
        msg,
        data,
    };
    ctx.status = 200;
};

//在array中查找needle，bool为布尔量，如果为true则返回needle在array中的位置
exports.inArray = (needle, array, bool) => {
    if(typeof needle=="string"||typeof needle=="number"){
        for(var i in array){
            if(needle===array[i]){
                if(bool){
                    return i;
                }
                return true;
            }
        }
        return false;
    }
};
