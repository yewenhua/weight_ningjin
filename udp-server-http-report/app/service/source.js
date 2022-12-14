'use strict';

const sleep = require('mz-modules/sleep');
const Service = require('egg').Service;
let memoryCache = {};

class SourceService extends Service {
    get(key) {
        return memoryCache[key];
    }

    async checkUpdate() {
        // check if remote data source has changed
        const updated = await mockCheck();
        this.ctx.logger.info('check update response %s', updated);
        return updated;
    }

    async update() {
        // update memory cache from remote
        memoryCache = await mockFetch();
        this.ctx.logger.info('update memory cache from remote: %j', memoryCache);
    }
}

let index = 0;

async function mockFetch() {
    await sleep(100);
    return {
        index: index++,
    };
}

async function mockCheck() {
    await sleep(100);
    return Math.random() > 0.5;
}

module.exports = SourceService;
