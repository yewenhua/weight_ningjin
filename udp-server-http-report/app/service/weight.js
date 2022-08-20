const Service = require('egg').Service;

class WeightService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async create(payload) {
        return await this.ctx.model.Weight.create(payload);
    }

    async insertMany(lists){
        return await this.ctx.model.Weight.insertMany(lists);
    }

    async index(payload) {
        let { currentPage, pageSize, isPaging, search } = payload;
        let res = [];
        let count = 0;
        let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
        if (isPaging) {
            if (search) {
                res = await this.ctx.model.Weight.find({ weighName: { $regex: search } })
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.Weight.find({})
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.Weight.count({})
                    .exec();
            }
        } else {
            if (search) {
                res = await this.ctx.model.Weight.find({ weighName: { $regex: search } })
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.Weight.find({})
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.Weight.count({})
                    .exec();
            }
        }
        // 整理数据源 -> Ant Design Pro
        let data = res.map((e, i) => {
            const jsonObject = Object.assign({}, e._doc);
            jsonObject.key = i;
            jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
            jsonObject.time = this.ctx.helper.formatTime(e.time);
            jsonObject.time2 = this.ctx.helper.formatTime(e.time2);
            return jsonObject;
        });

        return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
    }

    async findLatest() {
        const { ctx } = this;
        const row = await ctx.model.Weight
        .findOne()
        .sort({ createdAt: -1, weightId: -1 })
        .exec();

        return row;
    }

    async findFailList() {
        const { ctx } = this;
        const timestamp = (new Date()).getTime() - 60 * 60 * 1000;
        const date = (new Date()).setTime(timestamp);
        const rows = await ctx.model.Weight
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
        let res = await this.ctx.model.Weight.updateMany({
            weightId: {
                $in: ids
            }
        }, {
            updatedAt: new Date(),
            flag: value
        });
        return res;
    }

    async findYesterdayList() {
        const { ctx } = this;
        const beginTimestamp = (new Date()).getTime() - 48 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000;
        const endTimestamp = (new Date()).getTime() - 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000;
        const rows = await ctx.model.Weight
        .find({
            time: {
                $gte: (new Date()).setTime(beginTimestamp),
                $lt: (new Date()).setTime(endTimestamp)
            },
            deletetime: null
        })
        .exec();

        return rows;
    }

    async deleteByIds(ids) {
        const { ctx } = this;
        let res = await ctx.model.Weight.updateMany({
            weightId: {
                $in: ids
            }
        },{
            status: 0,
            deletetime: new Date()
        });
        return res;
    }

    async findInIds(ids) {
        const { ctx } = this;
        const rows = await ctx.model.Weight
        .find({
            weightId: {
                $in: ids
            }
        })
        .exec();

        return rows;
    }

    async findByWeightID(id) {
        const { ctx } = this;
        const row = await ctx.model.Weight
        .findOne({
            weightId: id
        })
        .exec();

        return row;
    }

    async findByRange(start, end) {
        const { ctx } = this;
        const rows = await ctx.model.Weight
        .find({
            time: {
                $gte: new Date(start),
                $lt: new Date(end)
            },
        })
        .exec();

        return rows;
    }

    async updateStatus(ids, value) {
        const { ctx } = this;
        let res = await this.ctx.model.Weight.updateMany({
            id: {
                $in: ids
            }
        }, {
            updatedAt: new Date(),
            status: value
        });
        return res;
    }
}

module.exports = WeightService;
