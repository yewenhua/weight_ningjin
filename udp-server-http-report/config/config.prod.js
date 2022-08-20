
exports.sequelize = {
    datasources: [
        {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '64y7nudx',
            database: 'egg',
            delegate: 'modelMysql',
            baseDir: 'modelMysql',  //sequelize和mongoose不能同时共存解决方案
            define: {
              schema: "dbo" //定义表名的前缀
            },
            timezone: '+08:00',
            logging: false          // 禁止日志输出, 不执行SQL打印  不写入日志文件
        }
        //...the other database
    ]
};

exports.logger = {
    level: 'WARN'   //只会输出 WARN 及以上（ERROR）的日志到文件中
};
