<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
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
        $products = Product::where('id', $id)->first();
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
            // for ( $i = 0; $i < $request->image; $i++ ) {
            //     $filename = str()->random(30);
            //     $extension = $request->image[$i]->extension();
    
            //     Storage::putFileAs('product_images', $request->image[$i], $filename.'.'.$extension);
            //     $image = $filename.'.'.$extension;
            // }
            $filename = str()->random(30);
            $extension = $request->image->extension();

            Storage::putFileAs('product_images', $request->image, $filename.'.'.$extension);
            $image = $filename.'.'.$extension;
        }

        $product = Product::create([
            'nama' => $request->nama,
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi,
            'stock' => $request->stock,
            'image' => $image != null ? $image : null,
            'created_by' => auth('api')->user()->id,
            'deleted' => 0
        ]);
        if ($product) {
            return new ProductResource(true, 'Adding product success', $product);
        }
    }

    public function product_edit(Request $request) {
        $validator = Validator::make($request->all(), [
            'id_product' => 'required|exists:product,id',
            'nama' => 'required|string',
            'harga' => 'required|integer|min:0',
            'deskripsi' => 'required',
            'stock' => 'required|integer|min:0',
        ]);

        if ($validator->errors()->any()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengedit product',
                'errors' => $validator->errors()->getMessages()
            ]);
        }
        
        try {
            if ($request->image) {
                $before = Product::where('id', $request->id_product)->first();
                if (Storage::delete('product_images/'.$before->image)) {
                    $filename = str()->random(30);
                    $extension = $request->image->extension();

                    Storage::putFileAs('product_images', $request->image, $filename.'.'.$extension);
                    $image = $filename.'.'.$extension;
                    Product::where('id', $request->id_product)->update([
                        'image' => $image
                    ]);
                }
            }
            $edit = Product::where('id', $request->id_product)->where('created_by', auth('api')->user()->id)->update([
                'nama' => $request->nama,
                'harga' => $request->harga,
                'deskripsi' => $request->deskripsi,
                'stock' => $request->stock
            ]);
    
            if ($edit) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data berhasil di update'
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => 'Data gagal di update',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data gagal di update',
                'errors' => $e->getMessage()
            ]);
        }
    }

    public function product_delete(Request $request) {
        $validator = Validator::make($request->all(), [
            'id_product' => 'required|exists:product,id'
        ]);

        if ($validator->errors()->any()) {
            return response()->json([
                'success' => false,
                'message' => 'Data gagal dihapus',
                'errors' => $validator->errors()->getMessages()
            ]);
        }

        try {
            $delete = Product::where('id', $request->id_product)->where('created_by', auth('api')->user()->id)->delete();
            if ($delete) {
                return response()->json([
                    'success' => true,
                    'message' => 'Product berhasil dihapus'
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => 'Product gagal dihapus'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product gagal dihapus',
                'errors' => $e->getMessage()
            ]);
        }
    }
}