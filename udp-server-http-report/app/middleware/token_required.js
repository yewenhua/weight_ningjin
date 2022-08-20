'use strict';

module.exports = () => {
    return async function(ctx, next) {
        let token = '';
        if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
            token = ctx.headers.authorization.split(' ')[1];
        } else if (ctx.query.accesstoken) {
            token = ctx.query.accesstoken;
        } else if (ctx.request.body.accesstoken) {
            token = ctx.request.body.accesstoken;
        }

        await next();
    };
};
