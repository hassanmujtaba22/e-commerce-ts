import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    code: "",
  },
  reducers: {
    addProduct: (state: any, action: any) => {
      let isProduct = state.products.find((x: any) => x._id === action.payload._id);
      if (isProduct) {
        state.products.map((item: any, key: any) => {
          if (item._id === action.payload._id) {
            state.products[key].quantity =
              state.products[key].quantity + action.payload.quantity;
          }
        });
      } else {
        state.products.push(action.payload);
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state: any, action: any) => {
      if (action.payload.quantity > 1) {
        state.products.map((item: any, key: any) => {
          if (item._id === action.payload._id) {
            state.products[key].quantity--;
          }
        });
      } else {
        const products = state.products.filter(
          (item: any) => item._id !== action.payload._id
        );
        state.products = products;
      }
      state.quantity--;
      state.total -= action.payload.price;
    },
    clear_cart: (state, action) => {
      state.total = 0;
      state.products = [];
      state.quantity = 0;
      state.code = "";
    },
    apply_ref_code: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { addProduct, removeProduct, clear_cart, apply_ref_code } =
  cartSlice.actions;
export default cartSlice.reducer;
