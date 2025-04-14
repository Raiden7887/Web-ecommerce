<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CreateWishlistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_user' => 'required',
            'id_product' => 'required'
        ]);

        if ($validator->errors()->any()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan wishlist',
                'errors' => $validator->errors()
            ]);
        }

        try {
            $wishlist = new Wishlist();
            $wishlist->id_user = auth('api')->user()->id ? auth('api')->user()->id : $request->id_user;
            $wishlist->id_product = $request->id_product;
            if ($wishlist->save()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Wishlist sudah berhasil dibuat',
                    'wishlists' => Wishlist::latest()->first()
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Wishlist gagal dibuat dengan error tidak diketahui',
                'error' => $e
            ]);
        } 
    }
}