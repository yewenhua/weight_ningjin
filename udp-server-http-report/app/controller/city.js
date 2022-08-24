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
                data.push({
                    "paramId": item.paramId,
                    "paramVal": Number(item.value),
                    "paramType": item.paramType,
                    "paramUnit": item.paramUnit,
                    "dataTime": ctx.helper.formatTime(item.datetime)
                });
                ids.push(item._id);
            }


            if(data.length > 0){
                let options = {
                    dataType: 'json',
                    method: 'POST',
                    data: {
                        listParams: data
                    },
                    headers: header
                };

                ctx.logger.warn('=========99999999999999=========');
                ctx.logger.warn(data);

                const res = await ctx.curl(url, options);
                ctx.logger.warn('=========report=========');
                ctx.logger.warn(res);
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
            //let token = await service.token.get();
            let token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijc4NjMxODllLWNiYjItNDllNi1hYTY2LWNjZTQ2NTQ0YzhmOCJ9.AiUS62d7dyZXByDJXJvU6i-Yxb9lA_iY2y49G-XjUQ1I0c2SEZ9UTOqUyjoi16ywqmVc2C7RpKTHVauJ_29VIA';
            let header = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": 'Bearer ' + token
            };
            let data = [];
            let ids  = [];

            //数据格式化，生成传递需要的数据格式
            for(let item of lists){
                data.push({
                    "paramId": item.paramId,
                    "paramVal": Number(item.value),
                    "paramType": item.paramType,
                    "paramUnit": item.paramUnit,
                    "dataTime": ctx.helper.formatTime(item.datetime)
                });
                ids.push(item._id);
            }

            if(data.length > 0){
                let options = {
                    dataType: 'json', //以 JSON 格式处理返回的响应 body
                    method: 'POST',
                    data: {
                        enterpriseId: null,
                        listParams: JSON.stringify(data)
                    },
                    headers: header
                };

                const res = await ctx.curl(url, options);
                ctx.logger.warn('=========retry=========');
                ctx.logger.warn(res);
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
