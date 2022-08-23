'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt, io } = app;
    router.get('/', controller.home.index);
    router.get('/source', controller.home.source);
    router.get('/cache', controller.home.cache);


    //路由拆分, 并不建议把路由规则逻辑散落在多个地方，会给排查问题带来困扰
    // mongo file
    require('./routes/mongo')(app);

    // city file
    require('./routes/city')(app);

    // socket.io  of划分命名空间
    io.of('/')     //和config文件的namespace中的 ‘/’对应
        .route('say', io.controller.chat.say);
    io.of('/')
        .route('exchange', io.controller.chat.exchange);

};
