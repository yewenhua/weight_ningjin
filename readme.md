宁晋项目数字一体化管控平台软件

一、对接平台分市平台和省平台，省平台对接文档见省平台文档目录，市平台对接文档见市平台文档目录

二、数据流程
内网DCS、Historian电脑部署测点采集程序采集数据，通过UDP协议经过单向网闸发送到网闸外的接口机的UDP服务器，并保存数据到接口机的MongoDB数据库
接口机部署一套TCP服务程序发送数据到省平台，接口机部署一套http服务程序发送数据到市平台

三、目录说明
1、backend为采集测点数据程序，编程语言PHP
2、node-tcp为tcp程序，编程语言为Nodejs
3、opc-udp为测点采集程序，编程语言python（已弃用）
4、udp-server-http-report为UDP服务器程序和http服务器，编程语言Nodejs

四、backend内程序部署说明
1、下载phpstudy集成环境软件，勾选PHP7.3以上，开启sockets扩展，部署程序
2、下载redis windows版，安装并部署开机启动
3、bat.crontab.bat为计划任务脚本，设置windows计划任务，开机启动，最高权限运行，无论用户登录与否都运行，触发器每天运行一次，重复任务间隔1分钟
4、bat.queue-work.bat为队列服务脚本设置开机启动，最高权限运行，无论用户登录与否都运行

五、node-tcp内程序部署说明
1、分地磅数据上报程序和DCS数据上报程序
2、安装MongoDB，nodejs，git，redis windows版，mongodb和redis设置开机启动，redis，MongoDB，nodejs添加到系统环境变量，运行方式参考node-tcp文件夹内的readme.md文件
3、DCS运行文件为client_dcs.js，部署时修改ecosystem.config.js文件，打开注释script: './client_dcs.js',关闭注释script: './client_garbage.js'
4、地磅上报运行文件为client_garbage.js，需部署到地磅服务器，部署时修改ecosystem.config.js文件，打开注释script: './client_garbage.js'，关闭注释script: './client_dcs.js'

六、udp-server-http-report内程序部署说明
1、运行方式参考udp-server-http-report文件夹内的readme.md文件
