import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCreate.css';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
    deskripsi: '',
    stock: '',
    image: null
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(formData)
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    console.log(formData)

    // const formDataToSend = new FormData();
    // formDataToSend.append('nama', formData.nama);
    // formDataToSend.append('harga', formData.harga);
    // formDataToSend.append('deskripsi', formData.deskripsi);
    // formDataToSend.append('stock', formData.stock);
    // if (formData.image) {
    //   formDataToSend.append('image', document.querySelector('#image').files);
    // }
    
    const test = {
      nama: formData.nama,
      deskripsi: formData.deskripsi,
      harga: formData.harga,
      stock: formData.stock,
      image: document.querySelector('#image').files
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/create/product', test, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res);
      }).catch((e) => {
        console.log(e)
      })
    } catch (error) {
      setError('Terjadi kesalahan saat membuat produk');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-create-container">
      <h1>Buat Produk Baru</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Gambar</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Mengirim...' : 'Buat Produk'}
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;