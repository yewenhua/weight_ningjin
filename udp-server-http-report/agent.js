'use strict';
const dgram = require('dgram');
module.exports = agent => {
    // 可以通过 messenger 对象发送消息给 App Worker，但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
    agent.messenger.on('egg-ready', () => {
        const data = {};
        agent.messenger.sendToApp('action', data);
    });

    //udp server
    const server = dgram.createSocket('udp4');
    server.on("error",function (err) {
        console.log("udp server error:\n" + err.stack);
        server.close();
    });

    //接收opc client采集到的数据，通过udp client广播发送到udp server，即当前agent扮演udp server角色
    server.on("message", (msg, rinfo) => {
        //console.log(JSON.parse(msg));
        //console.log("udpserver got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
        agent.messenger.sendRandom('newcoming', JSON.parse(msg));   //通过IPC通信发送给随机的一个worker
    });

    server.on("listening",function () {
        var address = server.address();
        console.log("udp server listening " +
        address.address + ":" + address.port);
    });

    server.bind(8899);
};
