<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\UdpClientJob;
use HistorianService;
use Log;

class UdpClient extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'collect:udpdata';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'collect udpdata';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->getAndSendData();
        return 0;
    }

    private function getAndSendData(){
        $prefix = config('historian.prefix');
        $tags = config('udp');
        $tagsNameString = '';
        $i = 0;
        $num = 20;
        $tag_str_arr = array();
        $final_list = array();
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
            $res = HistorianService::currentData($tag_str);
            //Log::info('222222222222');
            //Log::info(var_export($res, true));

            if ($res['code'] === 0 && $res['data']['ErrorCode'] === 0) {
                $datalist = $res['data']['Data'];
                $return = array();
                foreach ($datalist as $key => $item) {
                    if($item['Samples'] && !empty($item['Samples'])){
                        $return[] = array(
                            substr($item['TagName'], strlen($prefix) + 1),
                            $item['Samples'][0]['Value'],
                            $item['Samples'][0]['Quality'],
                            $item['Samples'][0]['TimeStamp']
                        );
                    }
                }
                if(!empty($return)){
                    $final_list[] = $return;
                }
            }
        }

        if(!empty($final_list)){
            foreach ($final_list as $key => $data) {
                dispatch(new UdpClientJob(json_encode($data)));
                sleep(1);
            }
        }
    }
}
