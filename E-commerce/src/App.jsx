import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="app">
          <nav className="navbar">
            <div className="nav-brand">
              <Link to="/">E-Commerce</Link>
            </div>
            <div className="nav-links">
              <Link to="/products">Produk</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/cart">Keranjang</Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>&copy; 2024 E-Commerce. All rights reserved.</p>
          </footer>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
