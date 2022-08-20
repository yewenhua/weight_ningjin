'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, DOUBLE } = app.Sequelize;

    const AVS = app.modelMysql.define('Weight', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        truckno: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        productcode: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        product: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        sender: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        firstweight: {
            type: DOUBLE,
            defaultValue: null,
            allowNull: true
        },
        secondweight: {
            type: DOUBLE,
            defaultValue: null,
            allowNull: true
        },
        firstdatetime: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        seconddatetime: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        grossdatetime: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        taredatetime: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        transporter: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        receiver: {
            type: STRING(50),
            defaultValue: null,
            allowNull: true
        },
        gross: {
            type: DOUBLE,
            defaultValue: null,
            allowNull: true
        },
        tare: {
            type: DOUBLE,
            defaultValue: null,
            allowNull: true
        },
        net: {
            type: DOUBLE,
            defaultValue: null,
            allowNull: true
        },
        datastatus: {
            type: STRING(10),
            defaultValue: null,
            allowNull: true
        }
    }, {
        tableName: 'Trade',
        underscored: false,
        timestamp: true,
        updatedAt: false, // 不想要 updatedAt
        createdAt: false  // 不想要 createdAt
        //createdAt: 'created_at'  //// 想要 createdAt 但是希望名称叫做 created_at
    });

    return AVS;
};
