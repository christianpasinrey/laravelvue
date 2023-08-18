<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $client = Role::create(['name' => 'client']);

        $models = [
            'users',
            'contact_messages',
        ];

        $actions = [
            'index',
            'show',
            'store',
            'update',
            'destroy',
            'getUserContactMessages',
        ];

        foreach ($models as $model) {
            foreach ($actions as $action) {
                if($model === 'users' && $action === 'getUserContactMessages') continue;
                if($model === 'users' && $action === 'store') continue;
                Permission::create(['name' => $model . '.' . $action]);
            }
        }

        $admin->givePermissionTo(Permission::all());

        $client->givePermissionTo([
            'contact_messages.store',
            'contact_messages.destroy',
            'contact_messages.getUserContactMessages',
            'users.show',
            'users.update',
        ]);
    }
}
