module.exports = app => {
    const v = app.config.version;

    app.router.get(`/${v}/api/weight/report`, app.controller.weight.report);
    app.router.get(`/${v}/api/weight/retry`, app.controller.weight.retry);
    app.router.get(`/${v}/api/weight/ping`, app.controller.weight.ping);
    app.router.get(`/${v}/api/weight`, app.controller.weight.index);
    app.router.get(`/${v}/api/weight/page`, app.controller.weight.page);
    app.router.get(`/${v}/api/weight/check`, app.controller.weight.check);
    app.router.get(`/${v}/api/weight/again`, app.controller.weight.again);
    app.router.post(`/${v}/api/weight/manual`, app.controller.weight.manual);
    app.router.get(`/${v}/api/weight/manual`, app.controller.weight.manual);
};
