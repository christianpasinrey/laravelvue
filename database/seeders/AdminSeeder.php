<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Christian',
            'email' => 'christian.pasin.rey@gmail.com',
            'password' => bcrypt('Abc.123456789')
        ]);

        $admin->assignRole('admin');
    }
}
