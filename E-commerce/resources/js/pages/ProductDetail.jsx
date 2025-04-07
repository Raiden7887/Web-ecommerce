import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import laptopImage from '../assets/laptop.jpeg';
import hpImage from '../assets/HP.jpeg';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

// Data dummy produk (dalam praktik nyata, ini akan diambil dari API)
const products = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 2999999,
    description: "Smartphone terbaru dengan spesifikasi tinggi",
    image: hpImage
  },
  {
    id: 2,
    name: "Laptop ABC",
    price: 12999999,
    description: "Laptop gaming dengan performa maksimal",
    image: laptopImage
  },
  {
    id: 3,
    name: "Smartphone Pro",
    price: 3999999,
    description: "Smartphone premium dengan kamera berkualitas tinggi",
    image: hpImage
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 15999999,
    description: "Laptop tipis dengan performa tinggi",
    image: laptopImage
  }
];

// Komponen untuk menampilkan detail produk
const ProductDetail = () => {
  // Hook untuk mendapatkan parameter URL dan navigasi
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Hook untuk mengakses fungsi keranjang dan wishlist
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Mencari produk berdasarkan ID
  const product = products.find(p => p.id === parseInt(id));

  // Menampilkan pesan jika produk tidak ditemukan
  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  // Fungsi untuk menangani pembelian langsung
  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
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

  // Render komponen ProductDetail
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Bagian gambar produk */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        {/* Bagian informasi produk */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">Rp {product.price.toLocaleString()}</p>
          <p className="description">{product.description}</p>
          
          {/* Bagian tombol aksi */}
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