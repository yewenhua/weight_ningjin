<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\UdpClientJob;

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
        dispatch(new UdpClientJob());
        return 0;
    }
}
