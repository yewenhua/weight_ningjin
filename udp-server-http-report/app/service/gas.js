const Service = require('egg').Service;

class GasService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async create(payload) {
        return await this.ctx.model.Gas.create(payload);
    }

    async insertMany(params){
        let data = [];
        console.log('00000000000000000');
        console.log(params);
        //return false;
        if(params && params.length > 0){
            for(let item of params){
                let tag = item[0];
                let value = String(item[1]);
                if(value == 'None' || value == 'none' || value == '' || value == 'null' || !value){
                    continue;
                }
                if(value.indexOf('.') !== -1){
                    value = Number(item[1]);
                    value = value.toFixed(4);
                }
                let time = (new Date(item[3])).getTime();
                let tagCnName;
                if(tag.indexOf('TRA_017') !== -1 || tag.indexOf('TRA_116C') !== -1 || tag.indexOf('TRA_216C') !== -1){
                    deviceFactorCode = 'realTimeTemp'; //实时温度
                    tagCnName = '实时温度';
                }
                else if(tag.indexOf('FS_FLOW') !== -1){
                    deviceFactorCode = 'leachate'; //渗沥液
                    tagCnName = '渗沥液';
                }
                else if(tag.indexOf('FS_NH3_N') !== -1){
                    deviceFactorCode = 'ammoniaNitrogen'; //氨氮
                    tagCnName = '氨氮';
                }
                else if(tag.indexOf('FS_PH') !== -1){
                    deviceFactorCode = 'phValue'; //ph值
                    tagCnName = 'ph值';
                }
                else if(tag.indexOf('FS_COD') !== -1){
                    deviceFactorCode = 'cod'; //COD
                    tagCnName = 'COD';
                }
                else if(tag.indexOf('DUST') !== -1){
                    deviceFactorCode = 'particulateMatter'; //颗粒物
                    tagCnName = '颗粒物';
                }
                else if(tag.indexOf('SO2') !== -1){
                    deviceFactorCode = 'sulfurDioxide'; //二氧化硫
                    tagCnName = '二氧化硫';
                }
                else if(tag.indexOf('NOX') !== -1){
                    deviceFactorCode = 'nitrogenOxide'; //氮氧化物
                    tagCnName = '氮氧化物';
                }
                else if(tag.indexOf('HCL') !== -1){
                    deviceFactorCode = 'hydrogenChloride'; //氯化氢
                    tagCnName = '氯化氢';
                }
                else if(tag.indexOf('CO') !== -1){
                    deviceFactorCode = 'carbonMonoxide'; //一氧化碳
                    tagCnName = '一氧化碳';
                }
                else if(tag.indexOf('noise') !== -1){
                    deviceFactorCode = 'noise'; //噪音
                    tagCnName = '噪音';
                }
                else if(tag.indexOf('dioxin') !== -1){
                    deviceFactorCode = 'dioxin'; //二恶英
                    tagCnName = '二恶英';
                }
                else{
                    tagCnName = '炉膛上部温度';
                }

                data.push({
                    tag: tag,
                    value: value,
                    datetime: time,
                    cn_name: tagCnName
                });
            }
        }

        let final_params = [];
        for(let item of data){
            const row = await this.ctx.model.Gas.findOne({
                tag: item.tag,
                datetime: item.datetime
            }).exec();

            if(row && row.value){
                // do nothing
            }
            else{
                final_params.push(item);
            }
        }

        //console.log('111111111111111111');
        //console.log(final_params);
        if(final_params.length > 0){
            return await this.ctx.model.Gas.insertMany(final_params);
        }
    }

    async index(payload) {
        let { currentPage, pageSize, isPaging, search } = payload;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
        if (isPaging) {
            if (search) {
                res = await this.ctx.model.Gas.find({ deviceCode: { $regex: search } })
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.Gas.find({})
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.Gas.count({})
                    .exec();
            }
        } else {
            if (search) {
                res = await this.ctx.model.Gas.find({ deviceCode: { $regex: search } })
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.Gas.find({})
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.Gas.count({})
                    .exec();
            }
        }
        // 整理数据源 -> Ant Design Pro
        let data = res.map((e, i) => {
            const jsonObject = Object.assign({}, e._doc);
            jsonObject.key = i;
            jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
            jsonObject.time = this.ctx.helper.formatTime(e.acquisitionDatetime);
            return jsonObject;
        });

        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }

    async findLatest() {
        const { ctx } = this;
        const rows = await ctx.model.Gas
        .find({
            deletetime: null,
            flag: 'init'
        })
        .limit(20)
        .sort({ createdAt: -1, _id: -1 })
        .exec();

        return rows;
    }

    async findFailList() {
        const { ctx } = this;
        const timestamp = (new Date()).getTime() - 60 * 60 * 1000;
        const date = (new Date()).setTime(timestamp);
        const rows = await ctx.model.Gas
        .find({"$or": [
            {
                flag: 'fail'
            },
            {
                flag: 'init',
                createdAt: {
                    $lt: date
                }
            }
        ]})
        .limit(20)
        .sort({ createdAt: -1 })
        .exec();

        return rows;
    }

    async updateFlag(ids, value) {
        const { ctx } = this;
        let res = await this.ctx.model.Gas.updateMany({
            _id: {
                $in: ids
            }
        }, {
            updatedAt: new Date(),
            flag: value
        });
        return res;
    }

    async deleteByIds(ids) {
        const { ctx } = this;
        let res = await ctx.model.Gas.updateMany({
            _id: {
                $in: ids
            }
        },{
            deletetime: new Date()
        });
        return res;
    }

    async findMonthBefore() {
        const { ctx } = this;
        const endTimestamp = (new Date()).getTime() - 30 * 24 * 60 * 60 * 1000;
        const rows = await ctx.model.Gas
        .find({
            acquisitionDatetime: {
                $lt: (new Date()).setTime(endTimestamp)
            },
            deletetime: null
        })
        .exec();

        return rows;
    }

    async destroyById(_id) {
        const { ctx } = this;
        const gas = await ctx.model.Gas.find(_id);
        if (!gas) {
            ctx.throw(404, 'gas not found');
        }
        return await ctx.model.Gas.findByIdAndRemove(_id);
    }
}

module.exports = GasService;
