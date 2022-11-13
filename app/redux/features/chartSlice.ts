import { createSlice } from "@reduxjs/toolkit";
import { CardState, ChartState, Product } from "../models/modals";

// Define the initial state using that type
const initialState: ChartState = {
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addChartList: (state, action) => {
      state.chartList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addChartList } = chartSlice.actions;

export default chartSlice.reducer;
