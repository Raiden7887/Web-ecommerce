import React, { useState } from 'react';
import './SearchBar.css';

// Komponen SearchBar untuk input pencarian
const SearchBar = ({ onSearch }) => {
  // State untuk menyimpan kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi untuk menangani submit form pencarian
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    onSearch(searchTerm); // Memanggil fungsi pencarian dari parent component
  };

  return (
    // Form pencarian
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Input field untuk kata kunci pencarian */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {/* Tombol submit pencarian */}
      <button type="submit" className="search-button">
        Cari
      </button>
    </form>
  );
};

export default SearchBar; 