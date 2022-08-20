//在每一个客户端连接或者退出时发生作用
const PREFIX = 'room';

module.exports = app => {
    return async (ctx, next) => {
        //连接时执行
        const { app, socket, logger, helper } = ctx;
        const id = socket.id;
        const nsp = app.io.of('/');
        const query = socket.handshake.query;

        // 用户信息
        const { room, userId } = query;
        const rooms = [ room ];

        //logger.debug('#user_info', id, room, userId);
        //logger.debug('#join', room);
        socket.join(room);   // 用户加入

        // 在线列表
        nsp.adapter.clients(rooms, (err, clients) => {
            //logger.debug('#online_join', clients);

            // 更新在线用户列表
            nsp.to(room).emit('online', {
                clients,
                action: 'join',
                target: 'participator',
                message: `User(${id}) joined.`,
            });
        });

        await next();


        //退出时执行
        //console.log('disconnection!');
        //logger.debug('#leave', room);  // 用户离开

        // 在线列表
        nsp.adapter.clients(rooms, (err, clients) => {
            //logger.debug('#online_leave', clients);

            // 更新在线用户列表
            nsp.to(room).emit('online', {
                clients,
                action: 'leave',
                target: 'participator',
                message: `User(${id}) leaved.`,
            });
        });
    };
};
