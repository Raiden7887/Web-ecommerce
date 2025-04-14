<?php

namespace App\Http\Controllers;

use App\Http\Resources\WishlistResource;
use App\Models\Wishlist;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WishlistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_user' => 'required',
            'id_product' => 'required|unique:wishlist,id_product'
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
                return new WishlistResource(true, 'Wishlist telah berhasil dibuat', null);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Wishlist gagal dibuat dengan error tidak diketahui',
                'error' => $e
            ]);
        } 
    }
    
    public function show(Request $request) {
        $wishlists = Wishlist::where('id_user', auth('api')->user()->id ? auth('api')->user()->id : $request->id_user)->get();
        if ($wishlists) {
            return new WishlistResource(true, 'Berhasil mengambil wishlist', $wishlists);
        }
        return response()->json([
            'message' => 'Tidak ada wishlist'
        ]);
    }
}