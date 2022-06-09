<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['Admin', 'User']; // First we define an array with the default app role names
        $models = [                 // Array of model names that have permissions middleware
            'task',
            'user'
        ];
        $actions = [                // Array of actions (right handler of permissions)
            'create',
            'read',
            'list',
            'update',
            'delete',
            'view-details'
        ];
        foreach ($roles as $role) {
        Role::create(['name' => $role]);                                                //Creating roles for each name defined in the array
        }
        $adminRole = Role::findByName('Admin');                                                 // Getting the role named Admin
        $userRole = Role::findByName('User');
        foreach ($models as $model) {
            foreach ($actions as $action) {
                $permission = Permission::create(['name' => $model . '-' . $action]);   //Creating permissions for each model and action defined in the array
                $adminRole->givePermissionTo($permission);                                  //Assigning the permissions to the Admin role
                $userRole->givePermissionTo($permission);
            }
        }
        $userRole->revokePermissionTo('task-view-details');
        $userRole->revokePermissionTo('user-update');
        $userRole->revokePermissionTo('user-delete');
        $userRole->revokePermissionTo('user-view-details');
    }
}
