var sqlserver = require('mssql');
var dbConfig = {
    server: '127.0.0.1',
    port: 1433,
    user: 'sa',
    password: '123456',
    database: 'toledo_aw'
};

var mssql_async= function (strsql) {
    return new Promise(function (resolve, reject) {
        sqlserver
            .connect(dbConfig)
            .then(function () {
                new sqlserver.Request()
                    .query(strsql)
                    .then(function (recordset) {
                        resolve(recordset);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
module.exports = mssql_async;
