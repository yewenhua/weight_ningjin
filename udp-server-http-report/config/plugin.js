'use strict';

/** @type Egg.EggPlugin */

exports.sequelize = {
    enable: false,
    package: 'egg-sequelize'
};

exports.validate = {
    enable: true,
    package: 'egg-validate'
};

exports.redis = {
    enable: true,
    package: 'egg-redis'
};

exports.cors = {
    enable: true,
    package: 'egg-cors'
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.io = {
    enable: true,
    package: 'egg-socket.io',
};

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};
