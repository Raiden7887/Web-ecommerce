import React, { useState } from 'react';
import './Checkout.css';

// Data dummy (dalam praktik nyata, ini akan diambil dari state management atau API)
const orderSummary = {
  items: [
    {
      id: 1,
      name: "Smartphone XYZ",
      price: 2999999,
      quantity: 1
    },
    {
      id: 2,
      name: "Laptop ABC",
      price: 12999999,
      quantity: 1
    }
  ],
  shipping: 15000
};

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementasi logika submit order
    alert('Pesanan berhasil dibuat!');
  };

  // Hitung total
  const subtotal = orderSummary.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + orderSummary.shipping;

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Informasi Pengiriman</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Alamat Lengkap</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Kota</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Kode Pos</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Metode Pembayaran</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="credit">Kartu Kredit</option>
                <option value="debit">Kartu Debit</option>
                <option value="transfer">Transfer Bank</option>
                <option value="e-wallet">E-Wallet</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Bayar Sekarang
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          <div className="summary-items">
            {orderSummary.items.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </div>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-total">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Ongkos Kirim</span>
              <span>Rp {orderSummary.shipping.toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 