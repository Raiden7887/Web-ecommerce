import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

// Komponen untuk menangani proses checkout
const Checkout = () => {
  // Hook untuk navigasi dan fungsi keranjang
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getTotalPrice } = useCart();
  
  // State untuk menyimpan data checkout
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost] = useState(15000);
  const [finalTotal, setFinalTotal] = useState(0);
  
  // State untuk menyimpan data form checkout
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'transfer'
  });

  // State untuk menyimpan pesan error
  const [error, setError] = useState('');

  // Effect untuk menginisialisasi data checkout
  useEffect(() => {
    // Cek apakah ini pembelian langsung
    if (location.state?.directBuy) {
      const savedCheckoutData = JSON.parse(sessionStorage.getItem('checkoutData'));
      if (savedCheckoutData) {
        setCheckoutItems(savedCheckoutData.items);
        setTotalPrice(savedCheckoutData.totalPrice);
        setFinalTotal(savedCheckoutData.finalTotal);
      }
    } else {
      // Jika dari keranjang, gunakan data cart
      setCheckoutItems(cart);
      const cartTotal = getTotalPrice();
      setTotalPrice(cartTotal);
      setFinalTotal(cartTotal + shippingCost);
    }
  }, [location.state, cart, getTotalPrice, shippingCost]);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.postalCode) {
      setError('Semua field harus diisi');
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email tidak valid');
      return;
    }

    // Validasi nomor telepon
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Nomor telepon tidak valid');
      return;
    }

    // Validasi kode pos
    const postalRegex = /^[0-9]{5,6}$/;
    if (!postalRegex.test(formData.postalCode)) {
      setError('Kode pos tidak valid');
      return;
    }

    // Proses checkout (dalam praktik nyata, ini akan mengirim data ke API)
    console.log('Checkout data:', {
      ...formData,
      items: checkoutItems,
      totalPrice,
      shippingCost,
      finalTotal
    });

    // Bersihkan data checkout jika pembelian langsung
    if (location.state?.directBuy) {
      sessionStorage.removeItem('checkoutData');
    }

    alert('Pesanan berhasil dibuat!');
    navigate('/products');
  };

  // Render komponen Checkout
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {/* Menampilkan pesan error jika ada */}
      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        {/* Form checkout */}
        <div className="checkout-form">
          <h2>Informasi Pengiriman</h2>
          <form onSubmit={handleSubmit}>
            {/* Input nama lengkap */}
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input nomor telepon */}
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input alamat */}
            <div className="form-group">
              <label htmlFor="address">Alamat Lengkap</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input kota */}
            <div className="form-group">
              <label htmlFor="city">Kota</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input kode pos */}
            <div className="form-group">
              <label htmlFor="postalCode">Kode Pos</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pilihan metode pembayaran */}
            <div className="form-group">
              <label htmlFor="paymentMethod">Metode Pembayaran</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Cash on Delivery</option>
                <option value="e-wallet">E-Wallet</option>
              </select>
            </div>

            {/* Tombol submit */}
            <button type="submit" className="submit-button">
              Buat Pesanan
            </button>
          </form>
        </div>

        {/* Ringkasan pesanan */}
        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          <div className="summary-items">
            {checkoutItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <span>{item.nama}</span>
                  <span>x{item.quantity}</span>
                </div>
                <span className="item-price">
                  Rp {(item.harga * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Total Harga:</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Ongkos Kirim:</span>
              <span>Rp {shippingCost.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>Rp {finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 