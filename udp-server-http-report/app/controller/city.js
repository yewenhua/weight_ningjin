const Controller = require('egg').Controller;

class CityController extends Controller {

    constructor(ctx) {
        super(ctx);
    }

    //上报最新数据
    async report() {
        const { app, ctx, service } = this;
        let nsp = app.io.of('/');
        let newestRows = await service.citydcs.findLatest();
        if(newestRows && newestRows.length > 0){
            let port = app.config.avs.port;
            let host = app.config.avs.host;
            let url = host + ':' + port + "/prod-api/base/home/gkDataPush";
            let token = await service.token.get();
            let header = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": 'Bearer ' + token
            };
            let data = [];
            let ids  = [];

            //数据格式化，生成传递需要的数据格式
            for(let item of newestRows){
                if(item.datetime){
                    let val;
                    if(item.value == 'false'){
                        val = 0;
                    }
                    else if(item.value == 'true'){
                        val = 1;
                    }
                    else{
                        val = Number(item.value);
                    }

                    data.push({
                        "paramId": item.paramId,
                        "paramVal": val,
                        "paramType": item.paramType,
                        "paramUnit": item.paramUnit,
                        "dataTime": ctx.helper.formatTime(item.datetime)
                    });
                    ids.push(item._id);
                }
            }

            //ctx.logger.warn('1111111111111');
            //ctx.logger.warn(data);

            if(data.length > 0){
                let options = {
                    dataType: 'json',     //以 JSON 格式处理响应
                    method: 'POST',
                    data: {
                        "listParams": data
                    },
                    headers: header
                };

                const res = await ctx.curl(url, options);
                ctx.logger.warn('=========report=========');
                ctx.logger.warn(res.data);
                if(res && res.status == 200 && res.data && res.data.code == 200){
                    let resUpdate = await service.citydcs.updateFlag(ids, 'success');
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
                    //await service.citydcs.updateFlag(ids, 'fail');
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
        const { app, ctx, service } = this;
        let nsp = app.io.of('/');
        let lists = await service.citydcs.findFailList();
        if(lists && lists.length > 0){
            let port = app.config.avs.port;
            let host = app.config.avs.host;
            let url = host + ':' + port + "/prod-api/base/home/gkDataPush";
            let token = await service.token.get();
            let header = {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token
            };
            let data = [];
            let ids  = [];

            //数据格式化，生成传递需要的数据格式
            for(let item of lists){
                if(item.datetime){
                    let val;
                    if(item.value == 'false'){
                        val = 0;
                    }
                    else if(item.value == 'true'){
                        val = 1;
                    }
                    else{
                        val = Number(item.value);
                    }

                    data.push({
                        "paramId": item.paramId,
                        "paramVal": val,
                        "paramType": item.paramType,
                        "paramUnit": item.paramUnit,
                        "dataTime": ctx.helper.formatTime(item.datetime)
                    });
                    ids.push(item._id);
                }
            }

            if(data.length > 0){
                let options = {
                    dataType: 'json', //以 JSON 格式处理返回的响应 body
                    method: 'POST',
                    data: {
                        "listParams": data
                    },
                    headers: header
                };

                const res = await ctx.curl(url, options);
                ctx.logger.warn('=========retry=========');
                ctx.logger.warn(res.data);
                if(res && res.status == 200 && res.data && res.data.code == 200){
                    let resUpdate = await service.citydcs.updateFlag(ids, 'success');
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
                    //await service.citydcs.updateFlag(ids, 'fail');
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
        const { app, ctx, service } = this;
        let rows = await service.citydcs.findMonthBefore();
        if(rows && rows.length > 0){
            for(let item of rows){
                await service.citydcs.destroyById(item._id);
            }
        }

        let rows2 = await service.provincedcs.findMonthBefore();
        if(rows2 && rows2.length > 0){
            for(let item of rows2){
                await service.provincedcs.destroyById(item._id);
            }
        }
    }

    async index() {
        const { ctx, service } = this;
        // 组装参数
        const payload = ctx.query;
        // 调用 Service 进行业务处理
        //const res = await service.citydcs.index(payload);
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
        const res = await service.citydcs.index(payload);
        // 设置响应内容和响应状态码

        ctx.helper.success(ctx, '获取成功', res);
    }
}

module.exports = CityController;
