module.exports = app => {
    const v = app.config.version;

    app.router.post(`/${v}/api/mongo`, app.controller.mongo.create);
    app.router.post(`/${v}/api/mongo/url`, app.controller.mongo.url);
    app.router.post(`/${v}/api/mongos`, app.controller.mongo.multiple);
    app.router.delete(`/${v}/api/mongo/:id`, app.controller.mongo.destroy);
    app.router.put(`/${v}/api/mongo/:id`, app.controller.mongo.update);
    app.router.put(`/${v}/api/mongo/:id/extra`, app.controller.mongo.extra);
    app.router.get(`/${v}/api/mongo/:id`, app.controller.mongo.show);
    app.router.get(`/${v}/api/mongo`, app.controller.mongo.index);
    app.router.delete(`/${v}/api/mongo`, app.controller.mongo.removes);
};
