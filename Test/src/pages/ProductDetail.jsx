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
    image: hpImage,
    specs: {
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB",
      storage: "256GB",
      battery: "5000mAh"
    }
  },
  {
    id: 2,
    name: "Laptop ABC",
    price: 12999999,
    description: "Laptop gaming dengan performa maksimal",
    image: laptopImage,
    specs: {
      processor: "Intel Core i7 12th Gen",
      ram: "16GB",
      storage: "1TB SSD",
      battery: "90Wh"
    }
  },
  {
    id: 3,
    name: "Smartphone Pro",
    price: 3999999,
    description: "Smartphone premium dengan kamera berkualitas tinggi",
    image: hpImage,
    specs: {
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      battery: "5500mAh"
    }
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 15999999,
    description: "Laptop tipis dengan performa tinggi",
    image: laptopImage,
    specs: {
      processor: "Intel Core i9 13th Gen",
      ram: "32GB",
      storage: "2TB SSD",
      battery: "100Wh"
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      alert('Produk dihapus dari wishlist!');
    } else {
      addToWishlist(product);
      alert('Produk ditambahkan ke wishlist!');
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert('Produk berhasil ditambahkan ke keranjang!');
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">Rp {product.price.toLocaleString()}</p>
          <p className="description">{product.description}</p>
          
          <div className="specifications">
            <h2>Spesifikasi:</h2>
            <ul>
              <li>Processor: {product.specs.processor}</li>
              <li>RAM: {product.specs.ram}</li>
              <li>Storage: {product.specs.storage}</li>
              <li>Battery: {product.specs.battery}</li>
            </ul>
          </div>

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