const Service = require('egg').Service;

class CityDcsService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async create(payload) {
        return await this.ctx.model.CityDcs.create(payload);
    }

    async index(payload) {
        let { currentPage, pageSize, isPaging, search } = payload;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
        if (isPaging) {
            if (search) {
                res = await this.ctx.model.CityDcs.find({ tag: { $regex: search } })
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.CityDcs.find({})
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.CityDcs.count({})
                    .exec();
            }
        } else {
            if (search) {
                res = await this.ctx.model.CityDcs.find({ tag: { $regex: search } })
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.CityDcs.find({})
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.CityDcs.count({})
                    .exec();
            }
        }
        // 整理数据源 -> Ant Design Pro
        let data = res.map((e, i) => {
            const jsonObject = Object.assign({}, e._doc);
            jsonObject.key = i;
            jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
            jsonObject.time = this.ctx.helper.formatTime(e.datetime);
            return jsonObject;
        });

        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }

    async findLatest() {
        const { ctx } = this;
        const rows = await ctx.model.CityDcs
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
        const rows = await ctx.model.CityDcs
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
        let res = await this.ctx.model.CityDcs.updateMany({
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
        let res = await ctx.model.CityDcs.updateMany({
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
        const endTimestamp = (new Date()).getTime() - 3 * 24 * 60 * 60 * 1000;
        const rows = await ctx.model.CityDcs
        .find({
            datetime: {
                $lt: (new Date()).setTime(endTimestamp)
            },
            deletetime: null
        })
        .exec();

        return rows;
    }

    async destroyById(_id) {
        const { ctx } = this;
        const row = await ctx.model.CityDcs.find(_id);
        if (!row) {
            ctx.throw(404, 'citydcs not found');
        }
        return await ctx.model.CityDcs.findByIdAndRemove(_id);
    }
}

module.exports = CityDcsService;
