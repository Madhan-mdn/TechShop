import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "techshop_cart";

const loadCartFromStorage = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (!serializedState) return [];
    const parsed = JSON.parse(serializedState);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!product || product.id == null) return;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const image = product.images?.[0] || product.heroImage || "";
        const finalPrice = Number(product.finalPrice ?? product.price) || 0;
        const originalPrice =
          Number(
            product.originalPrice ??
              product.priceBeforeDiscount ??
              finalPrice
          ) || finalPrice;

        state.items.push({
          id: product.id,
          title: product.title || "",
          info: product.info || "",
          images: product.images || (product.heroImage ? [product.heroImage] : []),
          heroImage: product.heroImage || image,
          image,
          finalPrice,
          originalPrice,
          brand: product.brand || "",
          category: product.category || "",
          type: product.type || "",
          quantity: 1,
        });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      saveCartToStorage(state.items);
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          // Decreasing from 1 removes the item
          state.items.splice(itemIndex, 1);
        }
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
