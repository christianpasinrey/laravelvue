<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class startApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'start:app';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start a fresh initialized application';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->call('key:generate');
        $this->call('migrate:fresh');
        $this->call('db:seed');
    }
}
