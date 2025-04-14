import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

// Komponen ProductCard untuk menampilkan informasi produk dalam bentuk card
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Link ke halaman detail produk */}
      <Link to={`/product/${product.id}`} className="product-link">
        {/* Menampilkan gambar produk jika ada */}
        {product.image && (
          <img src={'http://127.0.0.1:8000/storage/product_images/' + product.image} alt={'Gambar ' + product.nama} className="product-image" />
        )}
        {/* Menampilkan informasi produk */}
        <div className="product-info">
          <div className="product-name-price">
            <h3 title={product.nama}>{product.nama}</h3>
            <p className="price" title={`Rp ${product.harga.toLocaleString()}`}>
              Rp {product.harga.toLocaleString()}
            </p>
          </div>
          <p className="description">{product.deskripsi}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;