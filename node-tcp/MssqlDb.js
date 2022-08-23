var sqlserver = require('mssql');
var dbConfig = {
    server: '192.168.1.165',
    port: 1433,
    user: 'sa',
    password: '123',
    database: 'toledo_aw',
    options: {
        encrypt: false,
        useUTC: false
    }
};

var mssql_async= function (strsql) {
    return new Promise(function (resolve, reject) {
        sqlserver
            .connect(dbConfig)
            .then(function () {
                console.log('conn success');
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
