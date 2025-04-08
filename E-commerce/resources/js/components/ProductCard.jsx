import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <div className="product-name-price">
          <h3 title={product.name}>{product.name}</h3>
          <p className="price" title={`Rp ${product.price.toLocaleString()}`}>
            Rp {product.price.toLocaleString()}
          </p>
        </div>
        <p className="description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard; 