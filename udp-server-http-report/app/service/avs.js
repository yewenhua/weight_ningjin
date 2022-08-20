
const Service = require('egg').Service;

class AvsService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async findLatest(lastId=17306) {
        const { ctx } = this;
        const Op = ctx.app.Sequelize.Op;

        let where = {
            id: {
                [Op.gt]: lastId
            },
            firstweight: {
                [Op.not]: null
            },
            secondweight: {
                [Op.not]: null
            }
        };
        const rows = await ctx.modelMysql.AVS
        .findAll({
            where: where,
            limit: 200,
            order: [['id', 'ASC']]
        });

        return rows;
    }

    async findYesterdayList() {
        const { ctx } = this;
        const Op = ctx.app.Sequelize.Op;
        const beginTimestamp = (new Date()).getTime() - 48 * 60 * 60 * 1000;
        const endTimestamp = (new Date()).getTime() - 24 * 60 * 60 * 1000;
        const res = await ctx.modelMysql.AVS.findAndCountAll({
            where: {
                firstdatetime: {
                    [Op.lt]: ctx.helper.formatTime(endTimestamp),
                    [Op.gt]: ctx.helper.formatTime(beginTimestamp)
                }
            }
        });

        return res.rows;
    }

    async findTwodaysBefore() {
        const { ctx } = this;
        const Op = ctx.app.Sequelize.Op;
        const lastId = 10500;
        const beginTimestamp = (new Date()).getTime() -  10 * 24 * 60 * 60 * 1000;
        const endTimestamp = (new Date()).getTime() - 60 * 60 * 1000;
        const res = await ctx.modelMysql.AVS
        .findAndCountAll({
            where: {
                id: {
                    [Op.gt]: lastId
                },
                firstdatetime: {
                    [Op.lt]: ctx.helper.formatTime(endTimestamp),
                    [Op.gt]: ctx.helper.formatTime(beginTimestamp)
                },
                firstweight: {
                    [Op.not]: null
                },
                secondweight: {
                    [Op.not]: null
                }
            }
        });

        return res.rows;
    }

    async findByRange(start, end) {
        const { ctx } = this;
        const Op = ctx.app.Sequelize.Op;
        const beginTimestamp = (new Date(start)).getTime();
        const endTimestamp = (new Date(end)).getTime();

        const res = await ctx.modelMysql.AVS
        .findAndCountAll({
            where: {
                firstdatetime: {
                    [Op.lt]: ctx.helper.formatTime(endTimestamp),
                    [Op.gt]: ctx.helper.formatTime(beginTimestamp)
                }
            }
        });

        return res.rows;
    }
}

module.exports = AvsService;
