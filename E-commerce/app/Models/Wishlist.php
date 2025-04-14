<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    /** @use HasFactory<\Database\Factories\WishlistFactory> */
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_product'
    ];

    protected $table = 'wishlist';

    public function id_user(){
        $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function id_product() {
        $this->belongsTo(Product::class, 'id_product', 'id');
    }
}