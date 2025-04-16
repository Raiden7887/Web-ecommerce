<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $table = 'product';

    protected $fillable = [
        'nama',
        'deskripsi',
        'harga',
        'stock',
        'image',
        'created_by'
    ];

    public function wishlist() {
        return $this->hasMany(Wishlist::class);
    }
}