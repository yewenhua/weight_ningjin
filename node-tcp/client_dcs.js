// 构建TCP连接服务 客户端
const net = require('net');
const PackageTransform = require('./PackageTransform');
const Utils = require('./Utils');
const MongoDB = require('./MongoDb');

//参数初始化
let facKey = '2022081504080048_2602S';  //平台获取
let facId = 'NWSP.WHKDJC';              //平台获取
let msgId = 1000000;                    //初始msgId
let aes_key = '176d3805f01deeab';       //密钥长度16，自己随机生成
let overageBuffer, public_key;          //包缓存，公钥
let ids = [];                           //上报的数据id集合
let tsf = new PackageTransform();

//创建TCP客户端对象
let client = net.createConnection({
    host: 'nwsp.swds.top',
    port: 8886
});

//连接事件监听
client.on('connect', async () => {
    console.log('连接服务器成功了')
    // 当客户端与服务端建立连接成功以后，客户端就可以给服务器发数据了
    let param = {
        msgType: 1,             //消息类型
        msgId: msgId,           //每次请求唯一标识
        facKey: facKey,         //发送方发送数据所需密钥
        facId: facId,           //发送方注册唯一标识
        msgContent: JSON.stringify({
            secretKey: null,       //使用RSA公钥加密的AES密钥参数
            data: null
        })
    };

    await sendData(param);  //发送登录获取公钥
});

/**
* 客户端监听 data 事件
* 当服务端发消息过来就会触发该事件
*/
client.on('data', async chunk => {
    console.log('=========收到数据=========');
    if(overageBuffer && overageBuffer.length > 0){
        chunk = Buffer.concat([overageBuffer, chunk]);  ////如果上一次data有未完成的数据包的数据片段，合并到这次chunk前面一起处理
    }
    while(tsf.getPackageLen(chunk) && tsf.getPackageLen(chunk) <= chunk.length){    //如果接收到的数据中第一个数据包是完整的，进入循环体对数据进行拆包处理
        let packageLen = tsf.getPackageLen(chunk);  //用于缓存接收到的数据中第一个包的字节长度
        const packageCon = chunk.slice(0, packageLen); //截取接收到的数据的第一个数据包的数据
        chunk = chunk.slice(packageLen);    //截取除第一个数据包剩余的数据，用于下一轮循环或下一次data事件处理
        const ret = tsf.decode(packageCon); //解码当前数据中第一个数据包
        let msg = JSON.parse(ret.body);
        console.log('=========receive msg=========');
        console.log(msg);
        await receiveData(msg);
    };
    overageBuffer = chunk;  //缓存不完整的数据包，等待下一次data事件接收到数据后一起处理
});

client.on("end", () => {
    console.log("=========连接断开=========");
});

//发送数据
async function sendData(param){
    client.write(tsf.encode(JSON.stringify(param)));
    msgId++;
}

//接收数据
async function receiveData(msg){
    let msgContent = msg && msg.msgContent ? JSON.parse(msg.msgContent) : '';
    let data = null;
    if(msgContent && msgContent.success){
        let msgType = msg.msgType;
        switch(msgType) {
            case 1:
                //auth
                public_key = '-----BEGIN PUBLIC KEY-----\n' + msgContent.data  + '\n-----END PUBLIC KEY-----';
                while(true){
                    await reportDcsData();
                    await Utils.wait(60 * 1000);
                }
                break;
            case 2:
                //response响应消息
                if(ids.length > 0){
                    //更新上报状态
                    updateReportStatus('success', ids);
                }
                break;
            case 3:
                //ping
                let data = JSON.stringify({
                    success: true,
                    message: '成功',
                    data: 'pong'
                });

                let param = {
                    msgType: 4,             //消息类型
                    msgId: msgId,        //每次请求唯一标识
                    contentLength: BytesCount(data),
                    msgContent: data        //请求内容
                };

                //await sendData(param);
                break;
            default:
                //默认代码块
        }
    }
}

//上报地磅测点数据
async function reportDcsData(){
    //获取未上报或上报失败的测点数据，每次获取20条
    ids = [];
    let datalist = await MongoDB().findLimit('gas', {
        $or:[{flag: 'success'},{flag: 'init'}]
    }, 1, 1);

    let data = [];
    let itemParam = {};

    //数据格式化
    for(let item of datalist){
        itemParam = {
            "itemCode": item.code,      //测点在管控平台的CODE
            "itemValue": item.value,    //测点的值
            "sourceCode": item.tag,     //测点在源系统的code
            "instanceTime": new Date(item.datetime),        //测点数据的监测时间
            "sysId":1    //系统编号(用于区分同一个电厂的一期、二期)
        };
        data.push(itemParam);
        ids.push(item._id);
    }

    if(data.length > 0){
        console.log('AAAAAAAAAAAAAAAAAAA');
        console.log(data);
        let msgContent = JSON.stringify({
            secretKey: Utils.rsa_encode(public_key, aes_key),       //使用RSA公钥加密的AES密钥参数
            data: Utils.aes_encode2(aes_key, JSON.stringify(data))  //使用本地AES秘钥加密数据
        });

        let params = {
            msgType: 6,             //消息类型  5地磅  6测点数据
            //msgId: msgId,         //每次请求唯一标识
            facKey: facKey,         //发送方发送数据所需密钥
            facId: facId,           //发送方注册唯一标识
            contentLength: Utils.BytesCount(msgContent),
            msgContent: msgContent
        };

        console.log('0000000000000');
        await sendData(params);
    }
}

//更新上报状态
async function updateReportStatus(status='success', ids){
    await MongoDB().updateMany('gas', {
        _id: { $in: ids }
    }, {
        flag: 'success'
    });
}
