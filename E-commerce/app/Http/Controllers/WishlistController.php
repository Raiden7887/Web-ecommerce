<?php

namespace App\Http\Controllers;

use App\Http\Resources\WishlistResource;
use App\Models\Product;
use App\Models\Wishlist;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class WishlistController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|unique:wishlist,product_id'
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
            $wishlist->user_id = auth('api')->user()->id ? auth('api')->user()->id : $request->user_id;
            $wishlist->product_id = $request->product_id;
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
        // $wishlists = Wishlist::where('id_user', auth('api')->user()->id ? auth('api')->user()->id : $request->id_user)->get();
        $user = Auth::guard('api')->user();
        $wishlists = $user->wishlist()->with('product')->get();
        if ($wishlists) {
            return response()->json([
                'success' => true,
                'message' => 'Data wishlist berhasil diambil',
                'wishlists' => $wishlists
            ]);
        }
        return response()->json([
            'message' => 'Tidak ada wishlist'
        ]);
    }

    public function delete(Request $request) {
        $validator = Validator::make($request->all(), [
            'id_product' => 'required'
        ]);

        if ($validator->errors()->any()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus wishlist',
                'errors' => $validator->errors()->messages()
            ]);
        }

        try {
            $idUser = auth('api')->user()->id ? auth('api')->user()->id : $request->id_user;
            $wishlist = Wishlist::where('id_user', $idUser)->where('id_product', $request->id_product)->delete();
            if ($wishlist) {
                return response()->json([
                    'success' => true,
                    'message' => 'Wishlist telah berhasil dihapus'
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus wishlist, harap coba lagi'
            ]);
        }
        catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus wishlist',
                'errors' => $e->getMessage()
            ]);
        }
    }
}