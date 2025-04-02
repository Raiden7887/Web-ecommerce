import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div className="wishlist-container">
      <h1>Wishlist Saya</h1>
      
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Wishlist Anda masih kosong</p>
          <Link to="/products" className="continue-shopping">
            Lanjutkan Belanja
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="wishlist-item-info">
                <h3>{item.name}</h3>
                <p className="price">Rp {item.price.toLocaleString()}</p>
              </div>
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