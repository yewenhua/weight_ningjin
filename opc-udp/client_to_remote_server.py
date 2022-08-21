import OpenOPC
import pywintypes
import win32timezone
import time
import socket
import json
import configparser
import os
pywintypes.datetime = pywintypes.TimeType

class gasHelper:
    # 构造函数
    def __init__(self):
        self.opc = None
        self.opcserver = None
        self.tags = []
        self.group = None
        self.cf = self.load_ini()

        if self.conn():
            self.read_by_group()

    #连接
    def conn(self):
        flag = False
        try:
            #连接OPC  创建实例
            # DCOM mode is used to talk directly to OPC servers without the need for the OpenOPC Gateway Service.
            # This mode is only available to Windows clients
            self.opc = OpenOPC.client()  # DCOM mode
            #print('OPC 服务器列表')
            #print(self.opc.servers())
            #['CoDeSys.OPC.DA', 'Intellution.OPCiFIX.1', 'ABB.AC800MC_OpcDaServer.3', 'Intellution.IntellutionGatewayOPCServer', 'Intellution.iFixOPCClient', 'CoDeSys.OPC.02', 'Intellution.OPCEDA.3', 'Proficy.Historian.HDA']
            self.opcserver = self.get_value('opcserver')
            self.opc.connect(self.opcserver)
            #self.get_tags()
            #return False
        except Exception as e:
            print('异常退出')
            print(str(e))
            flag = False
        finally:
            flag = True
        return flag

    #获取tag列表
    def get_tags(self):
        print('=======所有变量=======\n')
        #print(self.opc.list()) #所有变量
        #print(self.opc.list('Applications.BurningLine1'))
        #print(self.cf.items('TAGS'))

    # 按组读取
    def read_by_group(self):
        values = []
        items = self.cf.items('TAGS')
        #tags = []
        for item in items:
            #tags.append(item[1])
            tag = item[1]
            loop = True
            while loop:
                try:
                    tag_tuple = (tag,)
                    read_value_tuple = self.opc.read(tag)
                    print('读取结果')
                    print(read_value_tuple)
                    merge_tuple = tag_tuple + read_value_tuple #元祖合并
                    values.append(merge_tuple)
                    print(merge_tuple)
                    loop = False
                except Exception as e:
                    print('异常退出')
                    print(str(e))
                finally:
                    print('finally')
                if loop:
                    time.sleep(8)

        #udp发送数据到网闸外
        self.udp_to_server(values)
        self.opc.close()

    #将数据通过udp协议传输到网闸外的udp server
    def udp_to_server(self, values):
        #local_ip = self.get_value('local_ip')
        server_ip = self.get_value('server_ip')
        #local_port = int(self.get_value('local_port'))
        server_port = int(self.get_value('server_port'))
        #local_addr = (local_ip, local_port)
        server_addr = (server_ip, server_port)
        udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # 绑定监听的地址和端口
        #udp.bind(local_addr)
        json_string = json.dumps(values)
        udp.sendto(json_string.encode(), server_addr)
        time.sleep(1)
        udp.close()

    #加载文件
    def load_ini(self):
        file_name = os.path.dirname(__file__) + '\\config.ini'
        cf = configparser.ConfigParser()
        cf.read(file_name, encoding='utf-8')
        return cf

    #获取value得值
    def get_value(self, key):
        data = self.cf.get('SETUP', key)
        return data

if __name__ == '__main__':
    gas = gasHelper()
