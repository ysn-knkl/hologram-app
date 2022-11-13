import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./features/cardSlice";
import barcodeReducer from "./features/barcodeSlice";
import profileReducer from "./features/profileSlice";
import chartReducer from "./features/chartSlice";

export const store = configureStore({
  reducer: {
    card: cardReducer,
    barcode: barcodeReducer,
    profile: profileReducer,
    chart: chartReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
