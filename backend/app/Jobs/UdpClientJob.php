<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

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
        $this->socket_udp_client($ip='127.0.0.1', $port='8899', $data='hello words');
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

    }
}
