import React, { createContext, useContext, useReducer } from 'react';

// Tipe aksi untuk reducer
const ACTIONS = {
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST'
};

// Initial state
const initialState = {
  items: []
};

// Reducer function
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_WISHLIST:
      // Cek apakah produk sudah ada di wishlist
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Jika sudah ada, tidak perlu ditambahkan lagi
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case ACTIONS.CLEAR_WISHLIST:
      return initialState;

    default:
      return state;
  }
};

// Buat context
const WishlistContext = createContext();

// Provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: ACTIONS.CLEAR_WISHLIST });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

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

// Custom hook untuk menggunakan wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 