import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Mengambil ID produk dari URL
  console.log('Product ID:', id); // Log untuk memeriksa nilai id
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);

  // Mengambil detail produk dari API berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/product/${id}`;
        console.log('Fetching product from:', url); // Log untuk memeriksa URL
        const response = await axios.get(url);
        console.log('API Response:', response.data); // Log untuk memeriksa respons API
        const data = response.data.data;
        if (data.success) {
          setProduct(data.products);
        } else {
          navigate('/products'); // Redirect ke halaman produk jika produk tidak ditemukan
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    // Reset state product saat id berubah
    return () => {
      setProduct(null);
    };
  }, [id, navigate]);

  // Fungsi untuk menangani pembelian langsung
  const handleBuyNow = () => {
    const checkoutData = {
      items: [{
        ...product,
        quantity: 1
      }],
      totalPrice: product.harga,
      shippingCost: 15000,
      finalTotal: product.harga + 15000
    };

    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    navigate('/checkout', { state: { directBuy: true } });
  };

  // Fungsi untuk menangani penambahan/penghapusan dari wishlist
  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      alert('Produk dihapus dari wishlist!');
    } else {
      addToWishlist(product);
      alert('Produk ditambahkan ke wishlist!');
    }
  };

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = () => {
    addToCart(product);
    alert('Produk berhasil ditambahkan ke keranjang!');
  };

  // Render komponen ProductDetail
  return (
    <div className="product-detail-container">

        <div className="product-detail">
        <div className="product-image">
          {/* Menampilkan gambar produk */}
          <img src={product?.image ? `http://127.0.0.1:8000/storage/product_images/` + product.image : 'default-image.jpg'} alt={product?.nama} />
        </div>
        <div className="product-info">
          <h1>{product?.nama}</h1>
          <p className="price">Rp {product?.harga.toLocaleString()}</p>
          <p className="description">{product?.deskripsi}</p>
          <div className="action-buttons">
            {/* Tombol untuk membeli langsung */}
            <button className="buy-now" onClick={handleBuyNow}>
              Beli Sekarang
            </button>
            {/* Tombol untuk menambahkan/ menghapus dari wishlist */}
            <button
              className={`wishlist ${isInWishlist(product?.id) ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              {isInWishlist(product?.id) ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
            </button>
            {/* Tombol untuk menambahkan ke keranjang */}
            <button className="add-to-cart" onClick={handleAddToCart}>
              Tambah ke Keranjang
            </button>
          </div>
        </div>
        </div>
      
    </div>
  );
};

export default ProductDetail;