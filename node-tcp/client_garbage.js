// 构建TCP连接服务 客户端
const net = require('net');
const PackageTransform = require('./PackageTransform');
const Utils = require('./Utils');
const mssql_async = require('./MssqlDb');

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
                    await reportGarbageData();
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

//上报地磅数据
async function reportGarbageData(){
    ids = [];
    let datalist;
    let data = [];
    let latest_report = await mssql_async('SELECT top 1* FROM Weight ORDER BY secondWeightTime DESC');
    if(latest_report && latest_report.recordset.length > 0){
        //从上一次上报的数据的下一条开始继续上报
        let sql = "SELECT top 5 id,truckno,cardno,product,sender,receiver,firstdatetime,seconddatetime,firstweight,secondweight,gross,tare,net,datastatus FROM Trade WHERE seconddatetime > '" + latest_report.recordset[0]['secondWeightTime'] + "' AND datastatus != 9 ORDER BY seconddatetime ASC";
        datalist = await mssql_async(sql);
    }
    else{
        //未曾上报过数据
        datalist = await mssql_async('SELECT top 5 id,truckno,cardno,product,sender,receiver,firstdatetime,seconddatetime,firstweight,secondweight,gross,tare,net,datastatus FROM Trade WHERE id > 46700 and datastatus != 9');
    }

    //第一次上报的数据
    for(let item of datalist.recordset){
        if(!item.gross || !item.tare){
            continue;
        }

        let proCode;
        if(item.product.indexOf('生活垃圾') !== -1){
            proCode = 1;
        }
        else if(item.product.indexOf('飞灰') !== -1){
            proCode = 2;
        }
        else if(item.product.indexOf('炉渣') !== -1){
            proCode = 3;
        }
        else if(item.product.indexOf('渗滤液') !== -1){
            proCode = 4;
        }
        else if(item.product.indexOf('活性炭') !== -1){
            proCode = 5;
        }
        else if(item.product.indexOf('消石灰') !== -1 || item.product.indexOf('氢氧化钙') !== -1){
            proCode = 6;
        }
        else if(item.product.indexOf('螯合剂') !== -1){
            proCode = 7;
        }
        else if(item.product.indexOf('水泥') !== -1){
            proCode = 8;
        }
        else if(item.product.indexOf('氨水') !== -1){
            proCode = 9;
        }
        else if(item.product.indexOf('盐酸') !== -1){
            proCode = 10;
        }
        else{
            continue;
        }

        let grossWeight = ((new Number(item.gross))/1000).toFixed(2);
        let tareWeight = ((new Number(item.tare))/1000).toFixed(2);
        let netWeight = ((new Number(item.net))/1000).toFixed(2);
        let itemParam =
        {
            "lsh": item.id,  //流水号
            "carNo": item.truckno,
            "cardNo": item.cardno, //ic卡号
            "proCode": proCode,     //1：生活垃圾；2：飞灰；3：炉渣；4：渗滤液；5：活性炭；6：消石灰；7：螯合剂；8：水泥；9：氨水；10：盐酸
            //"originalSourceArea": item.sender,  //地磅系统中的货物来源
            //"transportUnit": item.transporter,       //运输单位
            "firstWeightTime": Utils.formatTime(new Date(item.firstdatetime).getTime()),     //进厂时间，精确到时分秒
            "secondWeightTime": Utils.formatTime(new Date(item.seconddatetime).getTime()),    //出厂时间，精确到时分秒
            "gross": Number(grossWeight),  //毛重，单位：吨
            "tare": Number(tareWeight),   //皮重，单位：吨
            "net": Number(netWeight),    //净重，单位：吨
            //"operator": item.operator,  //称重员
            //"tradeSysId": 1,   //地磅系统id，如存在多个地磅称重系统，可用序号：1、2……来区分
            "dataStatus": 1,    //数据状态 1:生效 2:作废
            "statDateNum": Utils.formatDateNumber((new Date(item.seconddatetime)).getTime())  //磅单归属日期，值为出厂时间(secondWeightTime)的日期格式化，格式为：yyyyMMdd
        }
        data.push(itemParam);
        ids.push(item.id);
    };

    //插入上报数据记录
    if(data.length > 0){
        let insertSql = "INSERT INTO Weight (lsh, carNo, cardNo, proCode, firstWeightTime, secondWeightTime, gross, tare, net, dataStatus, statDateNum) VALUES ";
        let i = 0;
        for(let item of data){
            insertSql += `( ${item.lsh}, '${item.carNo}', '${item.cardNo}', ${item.proCode}, '${item.firstWeightTime}', '${item.secondWeightTime}', ${item.gross}, ${item.tare}, ${item.net}, ${item.dataStatus}, ${item.statDateNum})`;
            if(i != data.length-1){
                insertSql += ',';
            }
            i++;
        }

        await mssql_async(insertSql);
    }

    //上报失败的数据重新上报
    let fail_sql = "SELECT top 5 * FROM Weight WHERE flag = 'init' OR flag = 'fail'";
    let fail_report = await mssql_async(fail_sql);
    for(let item of fail_report.recordset){
        let itemParam =
        {
            "lsh": item.lsh,  //流水号
            "carNo": item.carNo,
            "cardNo": item.cardNo, //ic卡号
            "proCode": item.proCode,     //1：生活垃圾；2：飞灰；3：炉渣；4：渗滤液；5：活性炭；6：消石灰；7：螯合剂；8：水泥；9：氨水；10：盐酸
            //"originalSourceArea": item.originalSourceArea,  //地磅系统中的货物来源
            //"transportUnit": item.transportUnit,       //运输单位
            "firstWeightTime": item.firstWeightTime,     //进厂时间，精确到时分秒
            "secondWeightTime": item.secondWeightTime,    //出厂时间，精确到时分秒
            "gross": Number(item.gross),  //毛重，单位：吨
            "tare": Number(item.tare),   //皮重，单位：吨
            "net": Number(item.net),    //净重，单位：吨
            //"operator": item.operator,  //称重员
            //"tradeSysId": item.tradeSysId,   //地磅系统id，如存在多个地磅称重系统，可用序号：1、2……来区分
            //"orgId": item.orgId,     //组织id
            "dataStatus": item.dataStatus,    //数据状态 1:生效 2:作废
            "statDateNum": item.statDateNum  //磅单归属日期，值为出厂时间(secondWeightTime)的日期格式化，格式为：yyyyMMdd
        }
        data.push(itemParam);
        ids.push(item.lsh);
    }

    if(data.length > 0){
        let msgContent = JSON.stringify({
            secretKey: Utils.rsa_encode(public_key, aes_key),       //使用RSA公钥加密的AES密钥参数
            data: Utils.aes_encode2(aes_key, JSON.stringify(data))
        });

        let param = {
            msgType: 5,             //消息类型 5地磅  6测点数据
            //msgId: msgId,         //每次请求唯一标识
            facKey: facKey,         //发送方发送数据所需密钥
            facId: facId,           //发送方注册唯一标识
            contentLength: Utils.BytesCount(msgContent),
            msgContent: msgContent
        };

        await sendData(param);
    }
}

//更新上报状态
async function updateReportStatus(status='success', id_arr){
    let ids = id_arr.join();
    let sql = "UPDATE Weight SET flag = '" + status + "' WHERE lsh IN " + "(" + ids + ")";
    await mssql_async(sql);
}
