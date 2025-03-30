import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import laptopImage from '../assets/laptop.jpeg';
import hpImage from '../assets/HP.jpeg';
import { useCart } from '../context/CartContext';
import './Cart.css';

// Data dummy keranjang (dalam praktik nyata, ini akan diambil dari state management atau API)
const cartItems = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 2999999,
    image: hpImage,
    quantity: 1
  },
  {
    id: 2,
    name: "Laptop ABC",
    price: 12999999,
    image: laptopImage,
    quantity: 1
  },
  {
    id: 3,
    name: "Smartphone Pro",
    price: 3999999,
    image: hpImage,
    quantity: 1
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = getTotalPrice();
  const shippingCost = 15000;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="cart-container">
      <h1>Keranjang Belanja</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Keranjang belanja Anda masih kosong</p>
          <Link to="/products" className="continue-shopping">
            Lanjutkan Belanja
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="price">Rp {item.price.toLocaleString()}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Ringkasan Belanja</h2>
            <div className="summary-item">
              <span>Total Harga:</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Ongkos Kirim:</span>
              <span>Rp {shippingCost.toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>Rp {finalTotal.toLocaleString()}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Lanjut ke Pembayaran
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 