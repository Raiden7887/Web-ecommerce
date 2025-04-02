import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">Rp {product.price.toLocaleString()}</p>
          <p className="description">{product.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 