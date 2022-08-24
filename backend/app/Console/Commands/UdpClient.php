<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\UdpClientJob;
use HistorianService;

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
        //$this->getAndSendData();
        $this->test();
        return 0;
    }

    private function getAndSendData(){
        $prefix = config('historian.prefix');
        $tags = config('udp');
        $tagsNameString = '';
        $i = 0;
        $num = 5;
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
            Log::info('222222222222');
            Log::info(var_export($res, true));

            if ($res['code'] === 0 && $res['data']['ErrorCode'] === 0) {
                $datalist = $res['data']['Data'];
                $return = array();
                foreach ($datalist as $key => $item) {
                    if($item['Samples'] && !empty($item['Samples'])){
                        $return[] = array(
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
                dispatch(new UdpClientJob(json_encode($return)));
                sleep(1);
            }
        }
    }

    private function test(){
        $data = array(
            array(456, 6, '2022-08-24 12:12:40'),
            array(456, 6, '2022-08-24 12:12:41'),
            array(456, 6, '2022-08-24 12:12:42'),
            array(456, 6, '2022-08-24 12:12:43'),
            array(456, 6, '2022-08-24 12:12:44'),
            array(456, 6, '2022-08-24 12:12:45'),
            array(456, 6, '2022-08-24 12:12:46'),
            array(456, 6, '2022-08-24 12:12:47'),
            array(456, 6, '2022-08-24 12:12:48'),
            array(456, 6, '2022-08-24 12:12:49'),
            array(456, 6, '2022-08-24 12:12:40'),
            array(456, 6, '2022-08-24 12:12:41'),
            array(456, 6, '2022-08-24 12:12:42'),
            array(456, 6, '2022-08-24 12:12:43'),
            array(456, 6, '2022-08-24 12:12:44'),
            array(456, 6, '2022-08-24 12:12:45'),
            array(456, 6, '2022-08-24 12:12:46'),
            array(456, 6, '2022-08-24 12:12:47'),
            array(456, 6, '2022-08-24 12:12:48'),
            array(456, 6, '2022-08-24 12:12:49'),
            array(456, 6, '2022-08-24 12:12:40'),
            array(456, 6, '2022-08-24 12:12:41'),
            array(456, 6, '2022-08-24 12:12:42'),
            array(456, 6, '2022-08-24 12:12:43'),
            array(456, 6, '2022-08-24 12:12:44'),
            array(456, 6, '2022-08-24 12:12:45'),
            array(456, 6, '2022-08-24 12:12:46'),
            array(456, 6, '2022-08-24 12:12:47'),
            array(456, 6, '2022-08-24 12:12:48'),
            array(456, 6, '2022-08-24 12:12:49'),
            array(456, 6, '2022-08-24 12:12:40'),
            array(456, 6, '2022-08-24 12:12:41'),
            array(456, 6, '2022-08-24 12:12:42'),
            array(456, 6, '2022-08-24 12:12:43'),
            array(456, 6, '2022-08-24 12:12:44'),
            array(456, 6, '2022-08-24 12:12:45'),
            array(456, 6, '2022-08-24 12:12:46'),
            array(456, 6, '2022-08-24 12:12:47'),
            array(456, 6, '2022-08-24 12:12:48'),
            array(456, 6, '2022-08-24 12:12:49'),
        );

        for($i=0; $i<10; $i++){
            dispatch(new UdpClientJob(json_encode($data)));
            sleep(1);
        }
    }
}
