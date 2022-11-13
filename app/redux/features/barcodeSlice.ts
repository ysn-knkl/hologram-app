import { createSlice } from "@reduxjs/toolkit";

interface BarcodeState {
  barcodeList: string[];
}

// Define the initial state using that type
const initialState: BarcodeState = {
  barcodeList: [],
};

export const BarcodeSlice = createSlice({
  name: "barcode",
  initialState,
  reducers: {
    addBarcode: (state, action) => {
      state.barcodeList = [...state.barcodeList, action.payload];
    },
    deleteBarcode: (state, action) => {
      state.barcodeList = [
        ...state.barcodeList.filter((item) => item !== action.payload),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBarcode } = BarcodeSlice.actions;

export default BarcodeSlice.reducer;
