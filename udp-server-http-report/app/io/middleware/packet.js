//作用于每一个数据包（每一条消息）；通常用于对消息做预处理，又或者是对加密消息的解密等操作

module.exports = app => {
    return async (ctx, next) => {
        const say = await ctx.service.chat.say();
        ctx.socket.emit('response', 'packet!' + say);
        await next();
    };
};
