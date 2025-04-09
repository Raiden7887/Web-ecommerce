<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function product_list() {
        $products = Product::latest()->paginate(5);

        return response()->json([
            'success' => true,
            'products' => $products
        ]);
    }

    public function get_product($id) {
        $products = Product::find($id)->first();
        if ($products) {
            return new ProductResource(true, 'Mengambil data, berhasil', $products);
        }
    }

    public function product_create(Request $request) {
        $validator = Validator::make($request->all(), [
            'nama' => ['required'],
            'harga' => ['required', 'min:0'],
            'deskripsi' => ['required'],
            'stock' => ['required', 'min:0'],
            'harga' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ]);
        }
        $image = null;
        if ($request->image) {
            for ( $i = 0; $i < count($request->image); $i++ ) {
            $filename = str()->random(30);
                $extension = $request->image[$i]->extension();
    
                Storage::putFileAs('product_images', $request->image[$i], $filename.'.'.$extension);
                $image = $filename.'.'.$extension;
            }
        }

        $product = Product::create([
            'nama' => $request->nama,
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi,
            'stock' => $request->stock,
            'image' => $image != null ? $image : null,
            'created_by' => 'guest',
            'deleted' => 0
        ]);
        if ($product) {
            return new ProductResource(true, 'Adding product success', $product);
        }
    }
}