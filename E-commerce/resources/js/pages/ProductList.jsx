import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import laptopImage from '../assets/laptop.jpeg';
import hpImage from '../assets/HP.jpeg';
import './ProductList.css';

// Data dummy produk (dalam praktik nyata, ini akan diambil dari API)
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

// Komponen utama untuk menampilkan daftar produk
const ProductList = () => {
  // State untuk menyimpan kata kunci pencarian dan hasil filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Fungsi untuk menangani pencarian produk
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter produk berdasarkan kata kunci pencarian
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Render komponen ProductList
  return (
    <div className="product-list-container">
      <h1>Daftar Produk</h1>
      {/* Komponen SearchBar untuk input pencarian */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Menampilkan pesan jika tidak ada hasil pencarian */}
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>Tidak ada produk yang ditemukan untuk "{searchTerm}"</p>
        </div>
      ) : (
        // Grid untuk menampilkan daftar produk
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 