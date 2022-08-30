windows开机启动
安装
1、npm install pm2 -g   
2、npm install pm2-windows-startup -g   安装windows自启动包
运行
进入项目文件夹
1、pm2-startup install  创建开机启动脚本文件
2、pm2启用项目 pm2 start process.yml
3、保存 pm2 save
