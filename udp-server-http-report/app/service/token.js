'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
    async get() {
        const { app, ctx, service } = this;
        let key = ctx.helper.md5('ningjinspttoken');
        let val = await service.cache.get(key);
        if(!val){
            let username = app.config.avs.username;
            let password = app.config.avs.password;
            let port = app.config.avs.port;
            let host = app.config.avs.host;
            let url = host + ':' + port + "/prod-api/enterpriseLogin";
            let param = {
                username: username,
                password: password
            };

            let options = {
                dataType: 'json',
                method: 'POST',
                data: param
            };
            const res = await ctx.curl(url, options);
            if(res && res.status == 200 && res.data && res.data.code == 200){
                await service.cache.setex(key, res.data.token, 60 * 60);
                return res.data.token;
            }
            else{
                return '';
            }
        }
        else{
            return val;
        }
    }
}

module.exports = TokenService;
