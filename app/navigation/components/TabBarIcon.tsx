import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
Ionicons.loadFont()
interface ITabbarIcon {
  focused: boolean;
  routeName: string;
}

const TabbarIcon: React.FC<ITabbarIcon> = ({ focused, routeName }) => {
  let iconName = "";

  if (routeName === "charts") {
    iconName = focused ? "stats-chart" : "stats-chart-outline";
  } else if (routeName === "cards") {
    iconName = focused ? "cart" : "cart-outline";
  } else if (routeName === "barcode") {
    iconName = focused ? "barcode" : "barcode-outline";
  } else if (routeName === "profile") {
    iconName = focused ? "body" : "body-outline";
  }
  return (
    <View>
      <Ionicons name={iconName} size={25} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabbarIcon;
