import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import './ProductList.css';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Mengambil data produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        const data = await response.data;
        if (data.success) {
          setProducts(data.data.data);
          setFilteredProducts(data.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Fungsi untuk menangani pencarian produk
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = products.filter(product => 
      product.nama.toLowerCase().includes(term.toLowerCase()) ||
      product.deskripsi.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list-container">
      <h1>Daftar Produk</h1>
      <SearchBar onSearch={handleSearch} />
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>Tidak ada produk yang ditemukan untuk "{searchTerm}"</p>
        </div>
      ) : (
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