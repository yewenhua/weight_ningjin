const Controller = require('egg').Controller;

class GasController extends Controller {

    constructor(ctx) {
        super(ctx);
    }

    //上报最新数据
    async report() {
        return false;
        const { app, ctx, service } = this;
        let nsp = app.io.of('/');
        let newestRows = await service.gas.findLatest();
        if(newestRows && newestRows.length > 0){
            let accessKeyId = app.config.taizhouFenshaoApi.accessKeyId;
            let accessSecret = app.config.taizhouFenshaoApi.accessSecret;
            let host = app.config.taizhouFenshaoApi.host;
            let term_id = app.config.taizhouFenshaoApi.term_id;
            let systemCode = app.config.taizhouFenshaoApi.systemCode;
            let disposeUnitCode = app.config.taizhouFenshaoApi.disposeUnitCode;
            let weightNo = app.config.taizhouFenshaoApi.weightNo;
            let accessDate = (new Date()).getTime();
            let sign = ctx.helper.md5(accessKeyId + '-' + accessSecret + '-' + accessDate);
            let url = host + "/sds/deviceFactorData/addDeviceFactorsData";
            let header = {
                "Content-Type": "application/json; charset=utf-8",
                accessKeyId: accessKeyId,
                accessDate: accessDate,
                sign: sign
            };
            let data = [];
            let ids  = [];
            let keyArr = [];
            let keyObj = {};

            //数据格式化，生成传递需要的数据格式
            for(let item of newestRows){
                if(!ctx.helper.inArray(item.deviceCode, keyArr)){
                    keyArr.push(item.deviceCode);
                    keyObj[item.deviceCode] = [{
                        deviceCode: item.deviceCode,
                        deviceId: item.deviceId,
                        deviceType: item.deviceType,
                        deviceFactorCode: item.deviceFactorCode,
                        deviceFactorValue: item.deviceFactorValue,
                        acquisitionDatetime: item.acquisitionDatetime
                    }];
                }
                else{
                    keyObj[item.deviceCode].push({
                        deviceCode: item.deviceCode,
                        deviceId: item.deviceId,
                        deviceType: item.deviceType,
                        deviceFactorCode: item.deviceFactorCode,
                        deviceFactorValue: item.deviceFactorValue,
                        acquisitionDatetime: item.acquisitionDatetime
                    });
                }
                ids.push(item._id);
            }
            if(keyArr.length > 0){
                for(let key in keyObj){
                    data.push({
                        deviceCode: key,
                        deviceFactorDataList: keyObj[key]
                    });
                }
            }

            if(data.length > 0){
                let options = {
                    dataType: 'json',
                    method: 'POST',
                    data: {
                        params: data
                    },
                    headers: header
                };

                const res = await ctx.curl(url, options);
                ctx.logger.warn('0000000000000000');
                ctx.logger.warn(res);
                if(res && res.status == 200 && res.data && res.data.result == 0){
                    let resUpdate = await service.gas.updateFlag(ids, 'success');
                    if(resUpdate && resUpdate.nModified >= 1){
                        nsp.emit('newcoming', {
                            type: 'success',
                            msg: 'report success'
                        });
                        ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.msg);
                    }
                    else{
                        nsp.emit('newcoming', {
                            type: 'fail',
                            msg: 'report fail'
                        });
                        ctx.helper.success(ctx, '上报成功，状态更新失败', res.data.msg);
                    }
                }
                else{
                    //await service.gas.updateFlag(ids, 'fail');
                    ctx.helper.fail(ctx, '上报失败', res);
                }
            }
            else{
                ctx.helper.fail(ctx, '数据插入失败', '');
            }
        }
        else{
            ctx.helper.fail(ctx, '没有数据', '');
        }
    }

    //上报出错时重新上报
    async retry() {
        return false;
        const { app, ctx, service } = this;
        let nsp = app.io.of('/');
        let lists = await service.gas.findFailList();
        if(lists && lists.length > 0){
            let accessKeyId = app.config.taizhouFenshaoApi.accessKeyId;
            let accessSecret = app.config.taizhouFenshaoApi.accessSecret;
            let host = app.config.taizhouFenshaoApi.host;
            let term_id = app.config.taizhouFenshaoApi.term_id;
            let systemCode = app.config.taizhouFenshaoApi.systemCode;
            let disposeUnitCode = app.config.taizhouFenshaoApi.disposeUnitCode;
            let weightNo = app.config.taizhouFenshaoApi.weightNo;
            let accessDate = (new Date()).getTime();
            let sign = ctx.helper.md5(accessKeyId + '-' + accessSecret + '-' + accessDate);
            let url = host + "/sds/deviceFactorData/addDeviceFactorsData";
            let header = {
                "Content-Type": "application/json; charset=utf-8",
                accessKeyId: accessKeyId,
                accessDate: accessDate,
                sign: sign
            };
            let data = [];
            let ids  = [];
            let keyArr = [];
            let keyObj = {};

            //数据格式化，生成传递需要的数据格式
            for(let item of lists){
                if(!ctx.helper.inArray(item.deviceCode, keyArr)){
                    keyArr.push(item.deviceCode);
                    keyObj[item.deviceCode] = [{
                        deviceCode: item.deviceCode,
                        deviceId: item.deviceId,
                        deviceType: item.deviceType,
                        deviceFactorCode: item.deviceFactorCode,
                        deviceFactorValue: item.deviceFactorValue,
                        acquisitionDatetime: item.acquisitionDatetime
                    }];
                }
                else{
                    keyObj[item.deviceCode].push({
                        deviceCode: item.deviceCode,
                        deviceId: item.deviceId,
                        deviceType: item.deviceType,
                        deviceFactorCode: item.deviceFactorCode,
                        deviceFactorValue: item.deviceFactorValue,
                        acquisitionDatetime: item.acquisitionDatetime
                    });
                }
                ids.push(item._id);
            }
            if(keyArr.length > 0){
                for(let key in keyObj){
                    data.push({
                        deviceCode: key,
                        deviceFactorDataList: keyObj[key]
                    });
                }
            }

            if(data.length > 0){
                let options = {
                    dataType: 'json',
                    method: 'POST',
                    data: {
                        params: data
                    },
                    headers: header
                };

                const res = await ctx.curl(url, options);
                ctx.logger.warn('111111111111111111');
                ctx.logger.warn(res);
                if(res && res.status == 200 && res.data && res.data.result == 0){
                    let resUpdate = await service.gas.updateFlag(ids, 'success');
                    if(resUpdate && resUpdate.nModified >= 1){
                        nsp.emit('newcoming', {
                            type: 'success',
                            msg: 'report success'
                        });
                        ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.msg);
                    }
                    else{
                        nsp.emit('newcoming', {
                            type: 'fail',
                            msg: 'report fail'
                        });
                        ctx.helper.success(ctx, '上报成功，状态更新失败', res.data.msg);
                    }
                }
                else{
                    //await service.gas.updateFlag(ids, 'fail');
                    ctx.helper.fail(ctx, '上报失败', res);
                }
            }
            else{
                ctx.helper.fail(ctx, '数据插入失败', '');
            }
        }
        else{
            ctx.helper.fail(ctx, '没有数据', '');
        }
    }

    //删除数据
    async remove() {
        return false;
        const { app, ctx, service } = this;
        let rows = await service.gas.findMonthBefore();
        if(rows && rows.length > 0){
            for(let item of rows){
                await service.gas.destroyById(item._id);
            }
        }
    }

    async index() {
        const { ctx, service } = this;
        // 组装参数
        const payload = ctx.query;
        // 调用 Service 进行业务处理
        //const res = await service.gas.index(payload);
        // 设置响应内容和响应状态码

        let str = '欢迎来到天天的世界！';
        let arr = [{
            name: '明明',
            sex: '男',
            age: '18'
        },{
            name: '璇璇',
            sex: '女',
            age: '16'
        }];

        await this.ctx.render('report', {
            arr,
            str
        });
    }

    async page() {
        const { ctx, service } = this;
        // 组装参数
        const payload = ctx.query || {};
        payload.isPaging = true;
        payload.search = typeof(payload.search) != undefined ? payload.search : '' ;
        // 调用 Service 进行业务处理
        const res = await service.gas.index(payload);
        // 设置响应内容和响应状态码

        ctx.helper.success(ctx, '获取成功', res);
    }
}

module.exports = GasController;
