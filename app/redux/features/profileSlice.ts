import { createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
  profile: {
    name: string;
    surname: string;
  };
}

// Define the initial state using that type
const initialState: ProfileState = {
  profile: {
    name: "test",
    surname: "TestSurname",
  },
};

export const BarcodeSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.profile= {name:action.payload.name,surname:action.payload.surname}
    },
    updateProfile: (state, action) => {
      state.profile= {name:action.payload.name,surname:action.payload.surname}

    },
  },
});

// Action creators are generated for each case reducer function
export const { addProfile, updateProfile } = BarcodeSlice.actions;

export default BarcodeSlice.reducer;
