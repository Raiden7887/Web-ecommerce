import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);

  // Mengambil detail produk dari API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
        const data = response.data.data;
        console.log(data);
        if (data.success) {
          setProduct(data.products);
        } else {
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
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

  // Fungsi untuk menambahkan ke keranjang
  const handleAddToCart = () => {
    addToCart(product);
    alert('Produk berhasil ditambahkan ke keranjang!');
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image ? `http://127.0.0.1:8000/storage/product_images/${product.image}` : 'default-image.jpg'} alt={product.nama} />
        </div>
        <div className="product-info">
          <h1>{product.nama}</h1>
          <p className="price">Rp {product.harga.toLocaleString()}</p>
          <p className="description">{product.deskripsi}</p>
          <div className="action-buttons">
            <button className="buy-now" onClick={handleBuyNow}>
              Beli Sekarang
            </button>
            <button 
              className={`wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              {isInWishlist(product.id) ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
            </button>
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