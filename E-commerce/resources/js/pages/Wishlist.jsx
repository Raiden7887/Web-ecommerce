import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

// Komponen untuk menampilkan dan mengelola wishlist
const Wishlist = () => {
  // Hook untuk mengakses fungsi wishlist
  const { wishlist, removeFromWishlist } = useWishlist();

  // Fungsi untuk menghapus item dari wishlist
  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  // Render komponen Wishlist
  return (
    <div className="wishlist-container">
      <h1>Wishlist Saya</h1>
      
      {/* Menampilkan pesan jika wishlist kosong */}
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Wishlist Anda masih kosong</p>
          <Link to="/products" className="continue-shopping">
            Lanjutkan Belanja
          </Link>
        </div>
      ) : (
        // Grid untuk menampilkan daftar item wishlist
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              {/* Link ke halaman detail produk */}
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              {/* Informasi produk */}
              <div className="wishlist-item-info">
                <h3>{item.name}</h3>
                <p className="price">Rp {item.price.toLocaleString()}</p>
              </div>
              {/* Tombol hapus dari wishlist */}
              <button 
                className="remove-from-wishlist"
                onClick={() => handleRemoveFromWishlist(item.id)}
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 