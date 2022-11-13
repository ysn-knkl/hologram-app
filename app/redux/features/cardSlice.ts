import { createSlice } from "@reduxjs/toolkit";
import { ICardState, IProduct } from "../models/modals";

// Define the initial state using that type
const initialState: ICardState = {
 productList: [

  ],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    likeProduct: (state, action) => {
      const unchangedItems = state.productList.filter(
        (item: IProduct) => item.id !== action.payload
      );
      const manupulatedItems = state.productList.find(
        (item: IProduct) => item.id === action.payload
      );
      if (!manupulatedItems) return;

      const newItem = {
        ...manupulatedItems,
        like: !manupulatedItems?.like,
      };
      const newList = [...unchangedItems, newItem].sort((a, b) => a.id - b.id);

      state.productList = newList;
    },
    addProduct: (state, action) => {
      state.productList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { likeProduct, addProduct } = cardSlice.actions;

export default cardSlice.reducer;
