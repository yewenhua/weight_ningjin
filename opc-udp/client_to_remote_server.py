import OpenOPC
import pywintypes
import win32timezone
import time
import socket
import json
import configparser
import os
from threading import Thread
from multiprocessing import cpu_count
import math
pywintypes.datetime = pywintypes.TimeType

class DataThread(Thread):
    def __init__(self, opcserver, tags):
        super(DataThread, self).__init__()
        self.opcserver = opcserver
        self.tags = tags
        self.opc = None
        self.values = None

    def run(self):
        if self.conn():
            self.values = self.getData()

    #返回获得值
    def get_values(self):
        try:
            return self.values
        except Exception:
            return None

    #连接opc
    def conn(self):
        flag = False
        try:
            #连接OPC  创建实例
            self.opc = OpenOPC.client()  # DCOM mode
            self.opc.connect(self.opcserver)
            return True
        except Exception as e:
            print('异常退出')
            print(str(e))
            flag = False
        finally:
            print('conn finally')
        return flag

    #读取opc数据
    def getData(self):
        values = []
        time_start = time.time()
        success = 0
        for item in self.tags:
            tag = item[1]
            loop = True
            num = 0  #最多执行5次
            while loop and num < 5:
                try:
                    tag_tuple = (tag,)
                    read_value_tuple = self.opc.read(tag)
                    print('总条数' + str(len(self.tags)) + '，读取成功' + str(success + 1) + '次')
                    #print(read_value_tuple)
                    merge_tuple = tag_tuple + read_value_tuple #元祖合并
                    values.append(merge_tuple)
                    #print(merge_tuple)
                    loop = False
                    success = success + 1
                except Exception as e:
                    print('异常退出')
                    print(str(e))
                    num = num + 1
                finally:
                    #print('finally')
                    time_end = time.time()
                    diff = time_end - time_start
                    if diff > 120:
                        loop = False
                if loop:
                    time.sleep(8)
        self.opc.close()
        return values

class gasHelper:
    # 构造函数
    def __init__(self):
        self.cf = self.load_ini()
        self.read_by_thread()

    # 按组读取
    def read_by_thread(self):
        cpu_core_num = cpu_count()
        opcserver_big = self.get_value('opcserver_big')      #800系统
        opcserver_small = self.get_value('opcserver_small')  #500系统
        bigtags = self.cf.items('BIGTAGS')      #800系统点位
        smalltags = self.cf.items('SMALLTAGS')  #500系统点位

        th_list = []  #现场列表
        values = []   #最终返回值
        #800系统点位子线程，创建cpu核数相同数量的子线程
        big_item_len = math.floor(len(bigtags)/cpu_core_num)

        for i in range(cpu_core_num):
            start = i*big_item_len
            if (i == cpu_core_num-1):
                end = len(bigtags)
            else:
                end = (i+1)*big_item_len
            th_list.append(DataThread(opcserver_big, bigtags[start:end]))

        #500系统点位子线程
        th_list.append(DataThread(opcserver_small, smalltags))

        #执行子线程
        for th in th_list:
            th.start()

        #等待子线程结束
        for th in th_list:
            th.join()

        #合并各子线程获得的数据
        for th in th_list:
            val = th.get_values()
            values.extend(val)

        #udp发送数据到网闸外
        self.udp_to_server(values)
        os._exit(0)

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
