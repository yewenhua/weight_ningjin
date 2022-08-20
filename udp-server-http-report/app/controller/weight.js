const Controller = require('egg').Controller;

class WeightController extends Controller {

    constructor(ctx) {
        super(ctx);
    }

    //心跳
    async ping() {
        const { app, ctx, service } = this;
        let partnerId = app.config.avs.partnerId;
        let host = app.config.avs.host;
        let url = host + "/api/v1/third/heartbeat/check";
        let options = {
            dataType: 'json',
            method: 'GET',
            data: {
                partnerId: partnerId
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        const res = await ctx.curl(url, options);
        if(res && res.status == 200 && res.data && res.data.code == 0){
            ctx.helper.success(ctx, 'PING PONG SUCCESS', res.data.result);
        }
        else{
            ctx.helper.fail(ctx, 'PING PONG FAIL', res);
        }
    }

    //上报最新数据
    async report() {
        const { app, ctx, service } = this;
        let nsp = app.io.of('/');
        let latestRow = await service.weight.findLatest();
        let newestRows;
        if(latestRow){
            newestRows = await service.avs.findLatest(latestRow.weightId);
        }
        else{
            //未曾上报过数据
            newestRows = await service.avs.findLatest(17306);
        }

        if(newestRows && newestRows.length > 0){
            let partnerId = app.config.avs.partnerId;
            let host = app.config.avs.host;
            let url = host + "/api/v1/third/business/weight_list";

            let ids  = [];
            let data = [];
            let params = [];
            for(let item of newestRows){
                let time = Math.floor((new Date(item.created_at)).getTime()/1000);
                let garbageType;
                if(item.product.indexOf('可回收') !== -1 || item.productcode.indexOf('可回收') !== -1){
                    garbageType = 10;
                }
                else if(item.product.indexOf('有害') !== -1 || item.productcode.indexOf('有害') !== -1){
                    garbageType = 20;
                }
                else if(item.product.indexOf('医疗') !== -1 || item.productcode.indexOf('医疗') !== -1){
                    garbageType = 21;
                }
                else if(item.product.indexOf('餐厨') !== -1 || item.productcode.indexOf('餐厨') !== -1){
                    garbageType = 30;
                }
                else if(item.product.indexOf('厨余') !== -1 || item.productcode.indexOf('厨余') !== -1){
                    garbageType = 31;
                }
                else if(item.product.indexOf('生鲜') !== -1 || item.productcode.indexOf('生鲜') !== -1){
                    garbageType = 32;
                }
                else if(item.product.indexOf('地沟油') !== -1 || item.productcode.indexOf('地沟油') !== -1){
                    garbageType = 33;
                }
                else if(item.product.indexOf('餐厨厂其他类型') !== -1 || item.productcode.indexOf('餐厨厂其他类型') !== -1){
                    garbageType = 39;
                }
                else if(item.product.indexOf('其他垃圾') !== -1 || item.productcode.indexOf('其他垃圾') !== -1){
                    garbageType = 40;
                }
                else if(item.product.indexOf('生活垃圾') !== -1 || item.productcode.indexOf('生活垃圾') !== -1){
                    garbageType = 40;
                }
                else if(item.product.indexOf('易腐残渣') !== -1 || item.productcode.indexOf('易腐残渣') !== -1){
                    garbageType = 41;
                }
                else if(item.product.indexOf('工业垃圾') !== -1 || item.productcode.indexOf('工业垃圾') !== -1){
                    garbageType = 42;
                }
                else if(item.product.indexOf('炉渣') !== -1 || item.productcode.indexOf('炉渣') !== -1){
                    garbageType = 43;
                }
                else if(item.product.indexOf('边角料') !== -1 || item.productcode.indexOf('边角料') !== -1){
                    garbageType = 44;
                }
                else if(item.product.indexOf('陈腐垃圾') !== -1 || item.productcode.indexOf('陈腐垃圾') !== -1){
                    garbageType = 45;
                }
                else if(item.product.indexOf('飞灰') !== -1 || item.productcode.indexOf('飞灰') !== -1){
                    garbageType = 46;
                }
                else if(item.product.indexOf('焚烧厂其他类型') !== -1 || item.productcode.indexOf('焚烧厂其他类型') !== -1){
                    garbageType = 49;
                }
                else if(item.product.indexOf('柴油') !== -1 || item.productcode.indexOf('柴油') !== -1){
                    garbageType = 51;
                }
                else if(item.product.indexOf('氢氧化钠') !== -1 || item.productcode.indexOf('氢氧化钠') !== -1){
                    garbageType = 52;
                }
                else if(item.product.indexOf('氨水') !== -1 || item.productcode.indexOf('氨水') !== -1){
                    garbageType = 53;
                }
                else if(item.product.indexOf('活性炭') !== -1 || item.productcode.indexOf('活性炭') !== -1){
                    garbageType = 54;
                }
                else if(item.product.indexOf('氢氧化钙') !== -1 || item.productcode.indexOf('氢氧化钙') !== -1){
                    garbageType = 55;
                }
                else{
                    garbageType = 39;
                }

                if(item.datastatus == 9 || item.datastatus == '9'){
                    continue;
                }
                else if(!item.firstweight || !item.secondweight){
                    continue;
                }

                let timestamp1 = (new Date(item.firstdatetime)).getTime() - 8 * 60 * 60 * 1000;
                let timestamp2 = (new Date(item.seconddatetime)).getTime() - 8 * 60 * 60 * 1000;
                let timestamp3 = Math.floor(timestamp1/1000);
                let timestamp4 = null;
                if(item.seconddatetime){
                    timestamp4 = Math.floor(timestamp2/1000);
                }

                data.push({
                    partnerId: partnerId,
                    weightId: item.id,
                    weighType: 3, //3地磅称重
                    weighNo: item.truckno,
                    weighName: item.truckno,
                    garbageType: garbageType,
                    weight: item.firstweight,
                    unit: 2,  //1吨  2千克  3斤
                    time: timestamp3,
                    weightMode: 1,  //1毛重 2皮重 3净重
                    weight2: item.secondweight,
                    time2: timestamp4,
                    weightMode2: 2,  //1毛重 2皮重 3净重
                    status: 1,
                    garbageSource: item.sender
                });

                params.push({
                    partnerId: partnerId,
                    weightId: item.id,
                    weighType: 3, //3地磅称重
                    weighNo: item.truckno,
                    weighName: item.truckno,
                    garbageType: garbageType,
                    weight: item.firstweight,
                    unit: 2,  //1吨  2千克  3斤
                    time: (new Date()).setTime(timestamp1),
                    weightMode: 1,  //1毛重 2皮重 3净重
                    weight2: item.secondweight,
                    time2: (new Date()).setTime(timestamp2),
                    weightMode2: 2,  //1毛重 2皮重 3净重
                    status: 1,
                    garbageSource: item.sender
                });
                ids.push(item.id);
            }

            let rtn = await service.weight.insertMany(params);
            if(rtn && rtn.length > 0){
                //ctx.logger.warn(data);
                let options = {
                    dataType: 'json',
                    method: 'POST',
                    data: data,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                };

                const res = await ctx.curl(url, options);
                if(res && res.status == 200 && res.data && res.data.code == 0){
                    //ctx.logger.warn(res);
                    let resUpdate = await service.weight.updateFlag(ids, 'success');
                    if(resUpdate && resUpdate.nModified >= 1){
                        nsp.emit('newcoming', {
                            type: 'success',
                            msg: 'report success'
                        });
                        ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.result);
                    }
                    else{
                        nsp.emit('newcoming', {
                            type: 'fail',
                            msg: 'report fail'
                        });
                        ctx.helper.success(ctx, '上报成功，状态更新失败', res.data.result);
                    }
                }
                else{
                    await service.weight.updateFlag(ids, 'fail');
                    ctx.helper.fail(ctx, '上报失败', res);
                }
            }
            else{
                ctx.helper.fail(ctx, '数据插入失败', res);
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
        let lists = await service.weight.findFailList();
        if(lists && lists.length > 0){
            let partnerId = app.config.avs.partnerId;
            let host = app.config.avs.host;
            let url = host + "/api/v1/third/business/weight_list";

            let ids  = [];
            let data = [];
            for(let item of lists){
                let timestamp1 = Math.floor(((new Date(item.time)).getTime())/1000);
                let timestamp2 = null;
                if(item.time2){
                    timestamp2 = Math.floor(((new Date(item.time2)).getTime())/1000);
                }

                data.push({
                    partnerId: item.partnerId,
                    weightId: item.weightId,
                    weighType: item.weighType,
                    weighNo: item.weighNo,
                    weighName: item.weighName,
                    garbageType: item.garbageType,
                    weight: item.weight,
                    unit: item.unit,
                    time: timestamp1,
                    weightMode: item.weightMode,
                    weight2: item.weight2,
                    time2: timestamp2,
                    weightMode2: item.weightMode2,  //1毛重 2皮重 3净重
                    status: item.status,
                    garbageSource: item.garbageSource
                });
                ids.push(item.weightId);
            }

            let options = {
                dataType: 'json',
                method: 'POST',
                data: data,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            };
            const res = await ctx.curl(url, options);
            if(res && res.status == 200 && res.data && res.data.code == 0){
                let resUpdate = await service.weight.updateFlag(ids, 'success');
                if(resUpdate && resUpdate.nModified >= 1){
                    nsp.emit('newcoming', {
                        type: 'success',
                        msg: 'report success'
                    });
                    ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.result);
                }
                else{
                    nsp.emit('newcoming', {
                        type: 'fail',
                        msg: 'report fail'
                    });
                    ctx.helper.success(ctx, '上报成功，状态更新失败', res.data.result);
                }
            }
            else{
                ctx.helper.fail(ctx, '上报失败', res);
            }
        }
        else{
            ctx.helper.fail(ctx, '没有数据', '');
        }
    }

    //如有数据删除，更新上报的数据状态
    async check() {
        const { app, ctx, service } = this;
        let reportLists = await service.weight.findYesterdayList();
        if(reportLists && reportLists.length > 0){
            let originalLists = await service.avs.findYesterdayList();
            if(originalLists && originalLists.length > 0){
                let deleteLists = [];
                for(let item1 of reportLists){
                    let flag = false;
                    for(let item2 of originalLists){
                        let reportStatus = Number(item1.status);
                        let originalStatus = Number(item2.datastatus);
                        if(item1.weightId == item2.id && reportStatus != originalStatus && originalStatus == 9){
                            flag = true;
                            break;
                        }
                    }

                    if(flag){
                        item1.status = 0;
                        deleteLists.push(item1);
                    }
                }

                if(deleteLists.length > 0){
                    let partnerId = app.config.avs.partnerId;
                    let host = app.config.avs.host;
                    let url = host + "/api/v1/third/business/weight_list";

                    let ids  = [];
                    let data = [];
                    for(let item of deleteLists){
                        let timestamp1 = Math.floor(((new Date(item.time)).getTime())/1000);
                        let timestamp2 = null;
                        if(item.time2){
                            timestamp2 = Math.floor(((new Date(item.time2)).getTime())/1000);
                        }

                        data.push({
                            partnerId: item.partnerId,
                            weightId: item.weightId,
                            weighType: item.weighType,
                            weighNo: item.weighNo,
                            weighName: item.weighName,
                            garbageType: item.garbageType,
                            weight: item.weight,
                            unit: item.unit,
                            time: timestamp1,
                            weightMode: item.weightMode,
                            weight2: item.weight2,
                            time2: timestamp2,
                            weightMode2: item.weightMode2,  //1毛重 2皮重 3净重
                            status: item.status,
                            garbageSource: item.garbageSource
                        });
                        ids.push(item.weightId);
                    }

                    let options = {
                        dataType: 'json',
                        method: 'POST',
                        data: data,
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        }
                    };
                    const res = await ctx.curl(url, options);
                    if(res && res.status == 200 && res.data && res.data.code == 0){
                        let resUpdate = await service.weight.deleteByIds(ids);
                        if(resUpdate && resUpdate[0]){
                            ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.result);
                        }
                        else{
                            ctx.helper.fail(ctx, '修改数据失败', '');
                        }
                    }
                    else{
                        ctx.helper.fail(ctx, '上报失败', '');
                    }
                }
                else{
                    ctx.helper.fail(ctx, '没有数据', '');
                }
            }
            else{
                ctx.helper.fail(ctx, '没有数据', '');
            }
        }
        else{
            ctx.helper.fail(ctx, '没有数据', '');
        }
    }

    //重新核对两天以前的数据，有漏上报的则上报
    async again() {
        const { app, ctx, service } = this;
        //获取两天以前的数据
        let originalRows = await service.avs.findTwodaysBefore();
        if(originalRows && originalRows.length > 0){
            let ids = [];
            for(let item of originalRows){
                ids.push(item.id);
            }

            let reportRows = await service.weight.findInIds(ids);
            let failLists = [];
            for(let item1 of originalRows){
                let flag = false;
                for(let item2 of reportRows){
                    if(Number(item2.weightId) == Number(item1.id)){
                        flag = true;
                        break;
                    }
                }

                if(!flag){
                    failLists.push(item1);
                }
            }

            if(failLists && failLists.length > 0){
                let partnerId = app.config.avs.partnerId;
                let host = app.config.avs.host;
                let url = host + "/api/v1/third/business/weight_list";
                let ids  = [];
                let data = [];
                let params = [];
                for(let item of failLists){
                    if(item.datastatus == 9 || item.datastatus == '9'){
                        continue;
                    }
                    else if(!item.firstweight || !item.secondweight){
                        continue;
                    }

                    let garbageType;
                    if(item.product.indexOf('可回收') !== -1 || item.productcode.indexOf('可回收') !== -1){
                        garbageType = 10;
                    }
                    else if(item.product.indexOf('有害') !== -1 || item.productcode.indexOf('有害') !== -1){
                        garbageType = 20;
                    }
                    else if(item.product.indexOf('医疗') !== -1 || item.productcode.indexOf('医疗') !== -1){
                        garbageType = 21;
                    }
                    else if(item.product.indexOf('餐厨') !== -1 || item.productcode.indexOf('餐厨') !== -1){
                        garbageType = 30;
                    }
                    else if(item.product.indexOf('厨余') !== -1 || item.productcode.indexOf('厨余') !== -1){
                        garbageType = 31;
                    }
                    else if(item.product.indexOf('生鲜') !== -1 || item.productcode.indexOf('生鲜') !== -1){
                        garbageType = 32;
                    }
                    else if(item.product.indexOf('地沟油') !== -1 || item.productcode.indexOf('地沟油') !== -1){
                        garbageType = 33;
                    }
                    else if(item.product.indexOf('餐厨厂其他类型') !== -1 || item.productcode.indexOf('餐厨厂其他类型') !== -1){
                        garbageType = 39;
                    }
                    else if(item.product.indexOf('其他垃圾') !== -1 || item.productcode.indexOf('其他垃圾') !== -1){
                        garbageType = 40;
                    }
                    else if(item.product.indexOf('生活垃圾') !== -1 || item.productcode.indexOf('生活垃圾') !== -1){
                        garbageType = 40;
                    }
                    else if(item.product.indexOf('易腐残渣') !== -1 || item.productcode.indexOf('易腐残渣') !== -1){
                        garbageType = 41;
                    }
                    else if(item.product.indexOf('工业垃圾') !== -1 || item.productcode.indexOf('工业垃圾') !== -1){
                        garbageType = 42;
                    }
                    else if(item.product.indexOf('炉渣') !== -1 || item.productcode.indexOf('炉渣') !== -1){
                        garbageType = 43;
                    }
                    else if(item.product.indexOf('边角料') !== -1 || item.productcode.indexOf('边角料') !== -1){
                        garbageType = 44;
                    }
                    else if(item.product.indexOf('陈腐垃圾') !== -1 || item.productcode.indexOf('陈腐垃圾') !== -1){
                        garbageType = 45;
                    }
                    else if(item.product.indexOf('飞灰') !== -1 || item.productcode.indexOf('飞灰') !== -1){
                        garbageType = 46;
                    }
                    else if(item.product.indexOf('焚烧厂其他类型') !== -1 || item.productcode.indexOf('焚烧厂其他类型') !== -1){
                        garbageType = 49;
                    }
                    else if(item.product.indexOf('柴油') !== -1 || item.productcode.indexOf('柴油') !== -1){
                        garbageType = 51;
                    }
                    else if(item.product.indexOf('氢氧化钠') !== -1 || item.productcode.indexOf('氢氧化钠') !== -1){
                        garbageType = 52;
                    }
                    else if(item.product.indexOf('氨水') !== -1 || item.productcode.indexOf('氨水') !== -1){
                        garbageType = 53;
                    }
                    else if(item.product.indexOf('活性炭') !== -1 || item.productcode.indexOf('活性炭') !== -1){
                        garbageType = 54;
                    }
                    else if(item.product.indexOf('氢氧化钙') !== -1 || item.productcode.indexOf('氢氧化钙') !== -1){
                        garbageType = 55;
                    }
                    else{
                        garbageType = 39;
                    }

                    let timestamp1 = (new Date(item.grossdatetime)).getTime() - 8 * 60 * 60 * 1000;
                    let timestamp2 = (new Date(item.taredatetime)).getTime() - 8 * 60 * 60 * 1000;
                    let formatTime1 = ctx.helper.formatTime(timestamp1);
                    let formatTime2 = ctx.helper.formatTime(timestamp2);
                    let timestamp3 = Math.floor(timestamp1/1000);
                    let timestamp4 = null;
                    if(item.taredatetime){
                        timestamp4 = Math.floor(timestamp2/1000);
                    }

                    data.push({
                        partnerId: partnerId,
                        weightId: item.id,
                        weighType: 3, //3地磅称重
                        weighNo: item.truckno,
                        weighName: item.truckno,
                        garbageType: garbageType,
                        weight: item.firstweight,
                        unit: 2,  //1吨  2千克  3斤
                        time: timestamp3,
                        weightMode: 1,  //1毛重 2皮重 3净重
                        weight2: item.secondweight,
                        time2: timestamp4,
                        weightMode2: 2,  //1毛重 2皮重 3净重
                        status: 1,
                        garbageSource: item.sender
                    });

                    params.push({
                        partnerId: partnerId,
                        weightId: item.id,
                        weighType: 3, //3地磅称重
                        weighNo: item.truckno,
                        weighName: item.truckno,
                        garbageType: garbageType,
                        weight: item.firstweight,
                        unit: 2,  //1吨  2千克  3斤
                        time: new Date(formatTime1),
                        weightMode: 1,  //1毛重 2皮重 3净重
                        weight2: item.secondweight,
                        time2: new Date(formatTime2),
                        weightMode2: 2,  //1毛重 2皮重 3净重
                        status: 1,
                        flag: 'init',
                        garbageSource: item.sender
                    });

                    ids.push(item.id);
                }

                if(data.length > 0){
                    let rtn = await service.weight.insertMany(params);
                    if(rtn && rtn.length > 0){
                        let options = {
                            dataType: 'json',
                            method: 'POST',
                            data: data,
                            headers: {
                                "Content-Type": "application/json; charset=utf-8"
                            }
                        };

                        const res = await ctx.curl(url, options);
                        if(res && res.status == 200 && res.data && res.data.code == 0){
                            ctx.logger.warn('444444444444=====>again success');
                            let resUpdate = await service.weight.updateFlag(ids, 'success');
                            if(resUpdate && resUpdate[0]){
                                ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.result);
                            }
                            else{
                                ctx.helper.success(ctx, '上报成功，状态更新失败', res.data.result);
                            }
                        }
                        else{
                            await service.weight.updateFlag(ids, 'fail');
                            ctx.helper.fail(ctx, '上报失败', res);
                        }
                    }
                    else{
                        ctx.helper.fail(ctx, '数据插入失败', res);
                    }
                }
                else{
                    ctx.helper.fail(ctx, '没有数据', '');
                }
            }
            else{
                ctx.helper.fail(ctx, '没有数据', '');
            }
        }
        else{
            ctx.helper.fail(ctx, '没有数据', '');
        }
    }

    async index() {
        const { ctx, service } = this;
        // 组装参数
        const payload = ctx.query;
        // 调用 Service 进行业务处理
        //const res = await service.weight.index(payload);
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
        const res = await service.weight.index(payload);
        // 设置响应内容和响应状态码

        ctx.helper.success(ctx, '获取成功', res);
    }

    //手动上报
    async manual() {
        const { app, ctx, service } = this;
        let nsp = app.io.of('/');
        const payload = ctx.request.body;
        payload.start = payload && payload.start ? payload.start : ctx.helper.formatTime((new Date()).getTime() -  3.5 * 24 * 60 * 60 * 1000);
        payload.end = payload && payload.end ? payload.end : ctx.helper.formatTime((new Date()).getTime() - 3 * 24 * 60 * 60 * 1000);
        if(payload && payload.start && payload.end){
            let rows = await service.avs.findByRange(payload.start, payload.end);
            if(rows && rows.length > 0){
                let partnerId = app.config.avs.partnerId;
                let host = app.config.avs.host;
                let url = host + "/api/v1/third/business/weight_list";
                let ids  = [];
                let data = [];
                let params = [];
                let deleteIds = [];
                let uprows = await service.weight.findByRange(payload.start, payload.end);

                //判断已上报数据的是否被删除
                for(let uprow of uprows){
                    let flag1 = false;
                    for(let originalrow of rows){
                        if(uprow.weightId == originalrow.id){
                            flag1 = true;
                            break;
                        }
                    }
                    if(!flag1){
                        deleteIds.push(uprow.id);
                        let timestamp3 = Math.floor(((new Date(uprow.time)).getTime())/1000);
                        let timestamp4 = null;
                        if(uprow.time2){
                            timestamp4 = Math.floor(((new Date(uprow.time2)).getTime())/1000);
                        }

                        data.push({
                            partnerId: uprow.partnerId,
                            weightId: uprow.weightId,
                            weighType: uprow.weighType,
                            weighNo: uprow.weighNo,
                            weighName: uprow.weighName,
                            garbageType: uprow.garbageType,
                            weight: uprow.weight,
                            unit: uprow.unit,
                            time: timestamp3,
                            weightMode: uprow.weightMode,
                            weight2: uprow.weight2,
                            time2: timestamp4,
                            weightMode2: uprow.weightMode2,  //1毛重 2皮重 3净重
                            status: 0,
                            garbageSource: uprow.garbageSource
                        });
                    }
                }
                for(let item of rows){
                    let garbageType;
                    if(item.product.indexOf('可回收') !== -1 || item.productcode.indexOf('可回收') !== -1){
                        garbageType = 10;
                    }
                    else if(item.product.indexOf('有害') !== -1 || item.productcode.indexOf('有害') !== -1){
                        garbageType = 20;
                    }
                    else if(item.product.indexOf('医疗') !== -1 || item.productcode.indexOf('医疗') !== -1){
                        garbageType = 21;
                    }
                    else if(item.product.indexOf('餐厨') !== -1 || item.productcode.indexOf('餐厨') !== -1){
                        garbageType = 30;
                    }
                    else if(item.product.indexOf('厨余') !== -1 || item.productcode.indexOf('厨余') !== -1){
                        garbageType = 31;
                    }
                    else if(item.product.indexOf('生鲜') !== -1 || item.productcode.indexOf('生鲜') !== -1){
                        garbageType = 32;
                    }
                    else if(item.product.indexOf('地沟油') !== -1 || item.productcode.indexOf('地沟油') !== -1){
                        garbageType = 33;
                    }
                    else if(item.product.indexOf('餐厨厂其他类型') !== -1 || item.productcode.indexOf('餐厨厂其他类型') !== -1){
                        garbageType = 39;
                    }
                    else if(item.product.indexOf('其他垃圾') !== -1 || item.productcode.indexOf('其他垃圾') !== -1){
                        garbageType = 40;
                    }
                    else if(item.product.indexOf('生活垃圾') !== -1 || item.productcode.indexOf('生活垃圾') !== -1){
                        garbageType = 40;
                    }
                    else if(item.product.indexOf('易腐残渣') !== -1 || item.productcode.indexOf('易腐残渣') !== -1){
                        garbageType = 41;
                    }
                    else if(item.product.indexOf('工业垃圾') !== -1 || item.productcode.indexOf('工业垃圾') !== -1){
                        garbageType = 42;
                    }
                    else if(item.product.indexOf('炉渣') !== -1 || item.productcode.indexOf('炉渣') !== -1){
                        garbageType = 43;
                    }
                    else if(item.product.indexOf('边角料') !== -1 || item.productcode.indexOf('边角料') !== -1){
                        garbageType = 44;
                    }
                    else if(item.product.indexOf('陈腐垃圾') !== -1 || item.productcode.indexOf('陈腐垃圾') !== -1){
                        garbageType = 45;
                    }
                    else if(item.product.indexOf('飞灰') !== -1 || item.productcode.indexOf('飞灰') !== -1){
                        garbageType = 46;
                    }
                    else if(item.product.indexOf('焚烧厂其他类型') !== -1 || item.productcode.indexOf('焚烧厂其他类型') !== -1){
                        garbageType = 49;
                    }
                    else if(item.product.indexOf('柴油') !== -1 || item.productcode.indexOf('柴油') !== -1){
                        garbageType = 51;
                    }
                    else if(item.product.indexOf('氢氧化钠') !== -1 || item.productcode.indexOf('氢氧化钠') !== -1){
                        garbageType = 52;
                    }
                    else if(item.product.indexOf('氨水') !== -1 || item.productcode.indexOf('氨水') !== -1){
                        garbageType = 53;
                    }
                    else if(item.product.indexOf('活性炭') !== -1 || item.productcode.indexOf('活性炭') !== -1){
                        garbageType = 54;
                    }
                    else if(item.product.indexOf('氢氧化钙') !== -1 || item.productcode.indexOf('氢氧化钙') !== -1){
                        garbageType = 55;
                    }
                    else{
                        garbageType = 39;
                    }

                    let timestamp1 = (new Date(item.grossdatetime)).getTime() - 8 * 60 * 60 * 1000;
                    let timestamp2 = (new Date(item.taredatetime)).getTime() - 8 * 60 * 60 * 1000;
                    let formatTime1 = ctx.helper.formatTime(timestamp1);
                    let formatTime2 = ctx.helper.formatTime(timestamp2);
                    let timestamp3 = Math.floor(timestamp1/1000);
                    let timestamp4 = null;
                    if(item.taredatetime){
                        timestamp4 = Math.floor(timestamp2/1000);
                    }

                    data.push({
                        partnerId: partnerId,
                        weightId: item.id,
                        weighType: 3, //3地磅称重
                        weighNo: item.truckno,
                        weighName: item.truckno,
                        garbageType: garbageType,
                        weight: item.firstweight,
                        unit: 2,  //1吨  2千克  3斤
                        time: timestamp3,
                        weightMode: 1,  //1毛重 2皮重 3净重
                        weight2: item.secondweight,
                        time2: timestamp4,
                        weightMode2: 2,  //1毛重 2皮重 3净重
                        status: 1,
                        garbageSource: item.sender
                    });

                    let row = await service.weight.findByWeightID(item.id);
                    if(row && row.weightId){
                        //有记录数据 do nothing
                    }
                    else{
                        //没有记录数据，插入记录数据
                        params.push({
                            partnerId: partnerId,
                            weightId: item.id,
                            weighType: 3, //3地磅称重
                            weighNo: item.truckno,
                            weighName: item.truckno,
                            garbageType: garbageType,
                            weight: item.firstweight,
                            unit: 2,  //1吨  2千克  3斤
                            time: new Date(formatTime1),
                            weightMode: 1,  //1毛重 2皮重 3净重
                            weight2: item.secondweight,
                            time2: new Date(formatTime2),
                            weightMode2: 2,  //1毛重 2皮重 3净重
                            status: 1,
                            flag: 'init',
                            garbageSource: item.sender
                        });
                    }

                    ids.push(item.id);
                }
                ctx.logger.warn('11111111111111111111111');
                ctx.logger.warn(ids);

                if(data.length > 0){
                    if(params.length > 0){
                        //有未上报的数据插入数据库
                        let insertRtn = await service.weight.insertMany(params);
                    }
                    if(deleteIds.length > 0){
                        //有删除的数据更新上报状态
                        let updateRtn = await service.weight.updateStatus(deleteIds, 0);
                        ctx.logger.warn('8888888888888888');
                        ctx.logger.warn(deleteIds);
                    }
                    let options = {
                        dataType: 'json',
                        method: 'POST',
                        data: data,
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        }
                    };

                    const res = await ctx.curl(url, options);
                    ctx.logger.warn('22222222222222222222');
                    ctx.logger.warn(res);
                    if(res && res.status == 200 && res.data && res.data.code == 0){
                        let resUpdate = await service.weight.updateFlag(ids, 'success');
                        if(resUpdate && resUpdate.nModified >= 1){
                            nsp.emit('newcoming', {
                                type: 'success',
                                msg: 'report success'
                            });
                            ctx.helper.success(ctx, '上报成功，状态更新成功', res.data.result);
                        }
                        else{
                            nsp.emit('newcoming', {
                                type: 'fail',
                                msg: 'report fail'
                            });
                            ctx.helper.success(ctx, '上报成功，状态更新失败', res.data.result);
                        }
                    }
                    else{
                        await service.weight.updateFlag(ids, 'fail');
                        ctx.helper.fail(ctx, '上报失败', res);
                    }
                }
                else{
                    ctx.helper.fail(ctx, '没有数据', '');
                }
            }
            else{
                ctx.helper.fail(ctx, '没有数据', '');
            }
        }
        else{
            ctx.helper.fail(ctx, '参数错误', '');
        }
    }
}

module.exports = WeightController;
