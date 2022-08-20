module.exports = app => {
    const v = app.config.version;

    app.router.get(`/${v}/api/gas/report`, app.controller.gas.report);
    app.router.get(`/${v}/api/gas/retry`, app.controller.gas.retry);
    app.router.get(`/${v}/api/gas/remove`, app.controller.gas.remove);
    app.router.get(`/${v}/api/gas`, app.controller.gas.index);
    app.router.get(`/${v}/api/gas/page`, app.controller.gas.page);
};
