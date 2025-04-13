import React, { createContext, useContext, useReducer } from 'react';

// Mendefinisikan tipe aksi yang dapat dilakukan pada keranjang
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',         // Menambah item ke keranjang
  REMOVE_FROM_CART: 'REMOVE_FROM_CART', // Menghapus item dari keranjang
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',   // Mengupdate jumlah item
  CLEAR_CART: 'CLEAR_CART'             // Mengosongkan keranjang
};

// State awal keranjang
const initialState = {
  items: []
};

// Reducer function untuk mengelola state keranjang
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      // Mencari item yang sudah ada di keranjang
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Jika item sudah ada, tambah jumlahnya
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      // Jika item belum ada, tambahkan sebagai item baru
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case ACTIONS.REMOVE_FROM_CART:
      // Menghapus item dari keranjang berdasarkan ID
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case ACTIONS.UPDATE_QUANTITY:
      // Mengupdate jumlah item di keranjang
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case ACTIONS.CLEAR_CART:
      // Mengosongkan seluruh keranjang
      return initialState;

    default:
      return state;
  }
};

// Membuat context untuk keranjang
const CartContext = createContext();

// Provider component untuk keranjang
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  // Fungsi untuk mengupdate jumlah item
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  // Fungsi untuk mengosongkan keranjang
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  // Fungsi untuk menghitung total harga
  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.harga * item.quantity), 0);
  };

  // Render provider dengan value yang berisi fungsi-fungsi keranjang
  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook untuk menggunakan context keranjang
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 