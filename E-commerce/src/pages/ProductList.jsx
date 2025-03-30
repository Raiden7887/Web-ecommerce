import React from 'react';
import ProductCard from '../components/ProductCard';
import laptopImage from '../assets/laptop.jpeg';
import hpImage from '../assets/HP.jpeg';
import './ProductList.css';

// Data dummy produk
const products = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 2999999,
    description: "Smartphone terbaru dengan spesifikasi tinggi",
    image: hpImage
  },
  {
    id: 2,
    name: "Laptop ABC",
    price: 12999999,
    description: "Laptop gaming dengan performa maksimal",
    image: laptopImage
  },
  {
    id: 3,
    name: "Smartphone Pro",
    price: 3999999,
    description: "Smartphone premium dengan kamera berkualitas tinggi",
    image: hpImage
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 15999999,
    description: "Laptop tipis dengan performa tinggi",
    image: laptopImage
  }
];

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h1>Daftar Produk</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 