# egg

1、agent.js中运行UDP Server
2、收到数据后，随机发送数据到其中一个线程服务
3、存储数据到MongoDB
4、http应用定期从mongodb获取未上报的数据，进行上报到政府的接口服务器

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
