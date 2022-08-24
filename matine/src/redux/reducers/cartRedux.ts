import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    vendorTotal: 0,
    code: "",
  },
  reducers: {
    addProduct: (state: any, action) => {
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
      state.vendorTotal += action.payload.vendorPrice * action.payload.quantity;
    },
    addProductToCart: (state: any, action) => {
      let isProduct = state.products.find((x: any) => x._id === action.payload._id);
      let quantity = 0
      let total = 0
      let vendorTotal = 0
      if (!isProduct) {
        state.products.push(action.payload);
      }
      state.products.map((item: any, key: any) => {
        if (item._id === action.payload._id) {
          state.products[key].quantity = Number(action.payload.quantity);
        }
        quantity+=state.products[key].quantity
        total+=state.products[key].price*state.products[key].quantity
        vendorTotal+=state.products[key].vendorPrice*state.products[key].quantity
      });
      state.quantity = quantity;
      state.total = total;
      state.vendorTotal = vendorTotal;
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
      state.vendorTotal -= action.payload.vendorPrice;
    },
    clear_cart: (state) => {
      state.vendorTotal = 0;
      state.total = 0;
      state.products = [];
      state.quantity = 0;
      state.code = "";
    },
    clearProductFromCart: (state: any, action) => {
      const products = state.products.filter(
        (item: any) => item._id !== action.payload._id
      );
      let total = action.payload.quantity * action.payload.price
      let vendorTotal = action.payload.quantity * action.payload.vendorPrice
      state.quantity = state.quantity - action.payload.quantity;
      state.total = state.total - total;
      state.vendorTotal = state.vendorTotal - vendorTotal;
      state.products = products;
    },
    apply_ref_code: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { addProduct, removeProduct, clear_cart, apply_ref_code, clearProductFromCart, addProductToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
