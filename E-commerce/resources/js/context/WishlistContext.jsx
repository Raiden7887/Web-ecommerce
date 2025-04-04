import React, { createContext, useContext, useReducer } from 'react';

// Mendefinisikan tipe aksi yang dapat dilakukan pada wishlist
const ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',         // Menambah item ke wishlist
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST', // Menghapus item dari wishlist
  CLEAR_WISHLIST: 'CLEAR_WISHLIST'             // Mengosongkan wishlist
};

// State awal wishlist
const initialState = {
  items: []
};

// Reducer function untuk mengelola state wishlist
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_WISHLIST:
      // Mencari item yang sudah ada di wishlist
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Jika sudah ada, tidak perlu ditambahkan lagi
      }
      // Jika item belum ada, tambahkan ke wishlist
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case ACTIONS.REMOVE_FROM_WISHLIST:
      // Menghapus item dari wishlist berdasarkan ID
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case ACTIONS.CLEAR_WISHLIST:
      // Mengosongkan seluruh wishlist
      return initialState;

    default:
      return state;
  }
};

// Membuat context untuk wishlist
const WishlistContext = createContext();

// Provider component untuk wishlist
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Fungsi untuk menambah item ke wishlist
  const addToWishlist = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: product });
  };

  // Fungsi untuk menghapus item dari wishlist
  const removeFromWishlist = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: productId });
  };

  // Fungsi untuk mengosongkan wishlist
  const clearWishlist = () => {
    dispatch({ type: ACTIONS.CLEAR_WISHLIST });
  };

  // Fungsi untuk mengecek apakah item ada di wishlist
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Render provider dengan value yang berisi fungsi-fungsi wishlist
  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook untuk menggunakan context wishlist
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 