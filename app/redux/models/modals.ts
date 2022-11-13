import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type IProduct = {
  id: number;
  name: string;
  image_url: string;
  price: string;
  like: boolean;
};

export interface ICardState {
  productList: IProduct[];
}

export type ScreenProps = NativeStackScreenProps<ParamListBase>;

export type IChart = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
  id: number;
};

export interface IChartState {
  chartList?: IChart[];
}

export interface IProfile {
  name: string;
  surname: string;
}
export interface IProfileState {
  profile: IProfile
}
