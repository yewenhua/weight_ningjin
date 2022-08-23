module.exports = app => {
    const v = app.config.version;

    app.router.get(`/${v}/api/city/report`, app.controller.city.report);
    app.router.get(`/${v}/api/city/retry`, app.controller.city.retry);
    app.router.get(`/${v}/api/city/remove`, app.controller.city.remove);
    app.router.get(`/${v}/api/city`, app.controller.city.index);
    app.router.get(`/${v}/api/city/page`, app.controller.city.page);
};
