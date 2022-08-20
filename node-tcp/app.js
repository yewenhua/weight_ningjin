//引入net模块
var net=require('net');
var log4js = require('./logConfig');
var logger = log4js.getLogger('oth');

logger.info('=====================');

//创建TCP服务器
var server=net.createServer(function(socket){

    console.log('createServer: someone connets');
    //监听dada事件
    socket.on('data',function(data){

        //打印data
        logger.info('*********data coming**********');
        logger.info(data.toString());

    });

});

//设置监听端口
server.listen(18001);

//监听connection事件
server.on('connection',function(){
    console.log('connection: someone connets');
});

//设置监听时的回调函数
server.on('listen',function(){
    console.log('server is listening');
    //获取地址信息
    var address=server.address();
    //获取地址端口
    console.log('the port of server is'+address.port);
    console.log('the address of server is'+address.address);

    console.log('the family of server is'+address.family);
});

//设置关闭时的回调函数
server.on('close',function(){
    console.log('sever closed');
});


//设置出错时的回调函数
server.on('error',function(){
    console.log('error');
});
