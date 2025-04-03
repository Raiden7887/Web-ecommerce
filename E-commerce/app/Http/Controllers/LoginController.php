<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);
        }

        $cred = $request->only('email', 'password');

        if ($token = auth('api')->attempt($cred)) {
            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'userData' => auth('api')->user(),
                'token' => $token
            ]);
        }
    }
}