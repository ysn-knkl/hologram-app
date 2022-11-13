import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type Product = {
  id: number;
  name: string;
  image_url: string;
  price: string;
  like: boolean;
};

export interface CardState {
  productList: Product[];
}

export type ScreenProps = NativeStackScreenProps<ParamListBase>;

export type Chart = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
  id: number;
};

export interface ChartState {
  chartList?: Chart[];
}
