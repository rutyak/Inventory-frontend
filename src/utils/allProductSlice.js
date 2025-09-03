import { createSlice } from "@reduxjs/toolkit";

const allProductSlice = createSlice({
  name: "allProducts",
  initialState: {
    allProducts: [],
  },
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload; 
    },
  },
});

export const { addAllProducts } = allProductSlice.actions;

export default allProductSlice.reducer;
