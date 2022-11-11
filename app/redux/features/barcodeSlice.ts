import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/cards/CardItems";
import { RootState } from "../store";

// Define a type for the slice state
interface BarcodeState {
  barcodeList: string[];
}

// Define the initial state using that type
const initialState: BarcodeState = {
 barcodeList:[]
};

export const BarcodeSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addBarcode: (state, action) => {
      state.barcodeList = [...state.barcodeList,action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBarcode } = BarcodeSlice.actions;

export default BarcodeSlice.reducer;
