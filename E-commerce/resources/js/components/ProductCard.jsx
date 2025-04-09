import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        {product.image && (
          <img src={'http://127.0.0.1:8000/storage/product_images/' + product.image} alt={'Gambar ' + product.nama} className="product-image" />
        )}
        <div className="product-info">
          <div className="product-name-price">
            <h3 title={product.nama}>{product.nama}</h3>
            <p className="price" title={`Rp ${product.harga.toLocaleString()}`}>
              Rp {String(product.harga).toLocaleString()}
            </p>
          </div>
          <p className="description">{product.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 