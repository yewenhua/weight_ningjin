'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async source() {
        const { ctx, service } = this;
        ctx.body = {
            index: service.source.get('index'),
            lastUpdateBy: ctx.app.lastUpdateBy,
        };
    }

    async cache() {
        const { ctx, service } = this;
        let key = ctx.helper.md5('abcdef' + (new Date()).getTime());
        await service.cache.setex(key, 'HELLO WORLD', 60);
        let val = await service.cache.get(key);
        ctx.body = {
            val: val
        };
    }
}

module.exports = HomeController;
