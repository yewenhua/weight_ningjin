<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use HistorianService;
use Log;

class UdpClientJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //$this->socket_udp_client($ip='127.0.0.1', $port='8899', $data='hello words');
        $this->getData();
    }

    /**
    * socket udp客户端
    * @param string $ip IP地址
    * @param string $port 端口号
    * @param string $data 发送的数据
    * @return string 传递过来的数据
    */
    function socket_udp_client($ip='127.0.0.1', $port='8899', $data='hello word')
    {
        $cli = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP) or exit(socket_last_error());
        socket_sendto($cli, $data, strlen($data), 0, $ip, $port) or exit(socket_last_error()); //发送数据
        socket_recvfrom($cli, $data, 1024, 0, $ip, $port) or exit(socket_last_error()); //获取数据
        socket_close($cli);
        return $data;
    }

    private function getData(){
        $prefix = config('historian.prefix');
        $tags = config('udp');
        $tagsNameString = '';
        $datalist = array();
        $i = 0;
        $num = 5;
        $tag_str_arr = array();
        foreach ($tags as $key => $tag) {
            if(!$tagsNameString){
                $tagsNameString = $prefix.'.'.$tag;
            }
            else{
                $tagsNameString .= ';'.$prefix.'.'.$tag;
            }

            if($i > 0 && ($i % $num) == 0){
                $tag_str_arr[] = $tagsNameString;
                $tagsNameString = '';
            }

            if($i == (count($tags) - 1) && $tagsNameString){
                $tag_str_arr[] = $tagsNameString;
            }

            $i++;
        }

        foreach ($tag_str_arr as $key => $tag_str) {
            Log::info('00000000');
            Log::info(var_export($tag_str, true));
            $res = HistorianService::currentData($tag_str);
            Log::info('11111111111111111');
            Log::info(var_export($res, true));
            if ($res['code'] === 0 && $res['data']['ErrorCode'] === 0) {
                $datas = $res['data']['Data'];
                $datalist = array_merge($datalist, $datas);
            }
        }
        Log::info('222222222222');
        Log::info(var_export($datalist, true));
        return $datalist;
    }
}
