<?php

use App\Http\Controllers\CreateWishlistController;
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
    Route::get('/user', [UserController::class, 'index']);
    Route::post('/create/wishlist', CreateWishlistController::class);
});