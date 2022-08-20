'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {

    //监听到的事件
    async say() {
        const { ctx, app } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const client = socket.id;

        const say = await ctx.service.chat.say();
        this.ctx.socket.emit('response', 'controller!' + say);
    }

    async exchange() {
        const { ctx, app } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const client = socket.id;

        try {
            const { target, payload } = message;
            if (!target) return;
            const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
            nsp.emit(target, msg);
        } catch (error) {
            app.logger.error(error);
        }
    }
}

module.exports = ChatController;
