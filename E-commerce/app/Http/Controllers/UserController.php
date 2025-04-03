<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return response()->json(compact("users"));
    }

    public function login(Request $request) {
        $data = $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8']
        ]);

        $user = Auth::attempt($data);
        if ($user) {
            return new UserResource(true, 'Login Success', Auth::user());
        }
    }

    public function register(Request $request) {
        $data = $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'password', 'min:8'],
            'name' => ['required'],
        ]);

        $user = new User();
        $user->email = $data['email'];
        $user->password = md5($data['password']);
        $user->name = $data['name'];
        
        if ($user->save()) {
            return response([
                'code' => 200,
                'message' => 'Success'
            ]);
        }
    }
}