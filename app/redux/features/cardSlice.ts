import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/cards/CardItems";
import { RootState } from "../store";

// Define a type for the slice state
interface CardState {
  productList: Product[];
}

// Define the initial state using that type
const initialState: CardState = {
  productList: [
    {
      id: 1,
      name: "Apple MacBook Air M1 Çip 8GB 256GB SSD macOS 13 QHD Taşınabilir Bilgisayar Uzay Grisi MGN63TU/A",
      image_url:
        "https://productimages.hepsiburada.net/s/49/550/10983949860914.jpg/format:webp",
      price: "19.399,00 TL",
      like: false,
    },
    {
      id: 2,
      name: "Monster Tulpar T7 V20.5 Intel Core i7-12700H 16GB RAM 500GB SSD 6GB RTX3060 FreeDOS 17,3 FHD 144Hz Oyun Bilgisayarı",
      image_url:
        "https://productimages.hepsiburada.net/s/267/550/110000252781399.jpg/format:webp",
      price: "27.999,00 TL",
      like: false,
    },
    {
      id: 3,
      name: "Huawei Matebook D16 Intel Core i5 12450H 16GB 512GB SSD Windows 11 Home 16 Taşınabilir Bilgisayar",
      image_url:
        "https://productimages.hepsiburada.net/s/258/550/110000241125977.jpg/format:webp",
      price: "17.499,00 TL",
      like: false,
    },
  ],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    likeProduct: (state, action) => {
      state.productList = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { likeProduct } = cardSlice.actions;

export default cardSlice.reducer;
