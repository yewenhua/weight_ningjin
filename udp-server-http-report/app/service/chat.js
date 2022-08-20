const Service = require('egg').Service;

class ChatService extends Service {
    async say() {
        return 'Hello Man!';
    }
}

module.exports = ChatService;
