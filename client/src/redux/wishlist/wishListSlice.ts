import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types/book";

interface WishListState {
  isWishListOpen: boolean;
  items: Book[];
}

const STORAGE_KEY = "bookloom_wishlist";

const readStoredWishlist = ():Book[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeStoredWishlist = (items:Book[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
};

const initialState : WishListState= {
  isWishListOpen: false,
  items: readStoredWishlist(),
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    openWishList: (state) => {
      state.isWishListOpen = true;
    },
    closeWishList: (state) => {
      console.log("Here it reach");

      state.isWishListOpen = false;
    },
    addToWishList: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (!existingItem) {
        state.items.unshift(action.payload);
        writeStoredWishlist(state.items);
      }
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      writeStoredWishlist(state.items);
    },
    clearWishList: (state) => {
      state.items = [];
      writeStoredWishlist(state.items);
    },
  },
});

export const {
  openWishList,
  closeWishList,
  addToWishList,
  removeFromWishList,
  clearWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
