<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:users.index')->only('index');
        $this->middleware('can:users.show')->only('show');
        $this->middleware('can:users.update')->only('update');
        $this->middleware('can:users.destroy')->only('destroy');
    }

    public function index(){
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $authUser = User::find(auth()->user()->id);
        $role = $authUser->roles->first();
        switch($role){
            case 'admin':
                $user = User::find($id);
                return response()->json($user);
                break;
            case 'client':
                if($authUser->id == $id){
                    $user = User::find($id);
                    return response()->json($user);
                }

                return response()->json([
                    'message' => 'No tiene permisos para ver este usuario.'
                ]);
                break;
        }
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json([
            'message' => 'Usuario actualizado correctamente.',
            'user' => $user
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'Usuario eliminado correctamente.'
        ]);
    }
}
