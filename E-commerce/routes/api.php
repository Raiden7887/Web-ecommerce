<?php

use App\Http\Controllers\WishlistController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', RegisterController::class)->name('register');
Route::post('/login', LoginController::class)->name('login');

Route::get('/products', [ProductController::class, 'product_list']);
Route::get('/product/{id}', [ProductController::class, 'get_product']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', LogoutController::class)->name('logout');
    Route::post('/create/product', [ProductController::class, 'product_create']);
    Route::post('/edit/product', [ProductController:: class, 'product_edit']);
    Route::post('/delete/product', [ProductController::class, 'product_delete']);
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/wishlist', [WishlistController::class, 'show']);
    Route::post('/create/wishlist', WishlistController::class);
    Route::post('/delete/wishlist', [WishlistController::class, 'delete']);
});