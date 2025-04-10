import { Routes, Route, Link } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserProfile from '../pages/UserProfile';
import { CartProvider, useCart } from '../context/CartContext';
import { WishlistProvider, useWishlist } from '../context/WishlistContext';
import { AuthProvider, useAuth } from '../context/AuthContext';

import React from 'react';
import ProductCreate from '../pages/ProductCreate';

// Komponen untuk menampilkan badge pada link navbar
const NavBadge = ({ count }) => {
  if (count <= 0) return null;
  return <span className="nav-badge">{count}</span>;
};

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">E-Commerce</Link>
        </div>
        <div className="nav-links">
          <Link to="/products">Produk</Link>
          {isAuthenticated ? (
            <>
              <Link to="/wishlist">
                Wishlist
                <NavBadge count={wishlist.length} />
              </Link>
              <Link to="/cart">
                Keranjang
                <NavBadge count={cart.length} />
              </Link>
              <Link to="/profile" className="user-button">
                {user?.name}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Daftar</Link>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path='/product/create' element={<ProductCreate />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={isAuthenticated ? <Wishlist /> : <Login />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Login />} />
          <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2024 E-Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
