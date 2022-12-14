/*
*粘包解决方案
*/
class PackageTransform{
    constructor(){
        this.packageHeaderLen = 4;  //设置定长的消息头字节长度
        this.serialNum = 0;         //消息序列号
        this.serialLen = 2;         //消息头中每个数据占用的字节长度（序列号、消息长度值）
    }

    //编码
    encode(data, serialNum){    //data:当前write()实际要传输的数据； serialNum:当前消息的编号
        const body = Buffer.from(data);//将要传输的数据转换成二进制
        //01 先按照指定的长度来申请一片内存空间作为消息头header来使用
        const headerBuf = Buffer.alloc(this.packageHeaderLen);
        //02写入包的头部数据
        //headerBuf.writeInt16BE(serialNum || this.serialNum);//将当前消息编号以16进制写入
        headerBuf.writeInt16BE(body.length, this.serialLen);//将当前write()写入的数据的二进制长度作为消息的长度写入
        if(serialNum === undefined){
            this.serialNum ++;  //如果没有传入指定的序列号，表示在最佳写入，消息序列号+1
        }
        return Buffer.concat([headerBuf, body]);//将消息头和消息体合并成一个Buffer返回，交给TCP发送端
    }

    //解码
    decode(buffer){
        const headerBuf = buffer.slice(0, this.packageHeaderLen);   //获取消息头的二进制数据
        const bodyBuf = buffer.slice(this.packageHeaderLen);        //获取消息体的二进制数据
        return {
            //serialNum:headerBuf.readInt16BE(),
            bodyLength:headerBuf.readInt16BE(this.serialLen),
            body:bodyBuf.toString()
        };
    }

    //获取数据包长度的方法
    getPackageLen(buffer){
        if(buffer.length < this.packageHeaderLen){
            return 0;   //当数据长度小于数据包头部的长度时，说明它的数据是不完整的，返回0表示数据还没有完全传输到接收端
        }else{
            return this.packageHeaderLen + buffer.readInt16BE(this.serialLen);  //数据包头部长度+加上数据包消息体的长度(从数据包的头部数据中获取)，就是数据包的实际长度
        }
    }
}
module.exports = PackageTransform;
