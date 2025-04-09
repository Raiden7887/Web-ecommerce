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
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        const data = response.data;
        const products = data.products.data;
        console.log(response.data) // Mengambil data keseluruhan dari response (Perhatikan masing-masing parent/childnya)
        const isSuccess = response.data.success;
        console.log(products.data) // Mengambil data Products yang ada
        console.log(products) // Mengambil struktur data (Lihat response di whatsapp)
        console.log(isSuccess) // Mengambil data apakah pengambilan data sudah sukses
        if (response.data.success) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
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