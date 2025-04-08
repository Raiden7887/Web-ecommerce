<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('product')) {
            Schema::dropIfExists('product');
        }
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('deskripsi');
            $table->bigInteger('harga');
            $table->integer('stock')->default(0);
            $table->string('image')->nullable();
            $table->string('created_by');
            $table->boolean('deleted')->default(false);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('product')) {
            Schema::dropIfExists('product');
        }
    }
};