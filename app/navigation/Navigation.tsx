import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer as ReactNavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import React from "react";
import Charts from "../screen/charts/Charts";
import Cards from "../screen/cards/Cards";
import Barcode from "../screen/barcode/Barcode";
import Profile from "../screen/profile/Profile";
import TabbarIcon from "./components/TabBarIcon";
import { ROUTES } from "../constant";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DEFAULT_TABBAR_HEIGHT = 45;

const TabNavigationContainer = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          return TabbarIcon({ focused, routeName: route.name });
        },
        tabBarStyle: {
          ...styles.container,
          ...{ height: insets.bottom + DEFAULT_TABBAR_HEIGHT },
        },
      })}
    >
      <Tab.Screen name={ROUTES.CHARTS} component={Charts} />
      <Tab.Screen name={ROUTES.CARDS} component={Cards} />
      <Tab.Screen name={ROUTES.BARCODE} component={Barcode} />
      <Tab.Screen name={ROUTES.PROFİLE} component={Profile} />
    </Tab.Navigator>
  );
};

const NavigationContainer: React.FC = () => {
  const isLoggedIn = true;

  return (
    <ReactNavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="onboardingRoot" component={Cards} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            fullScreenGestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="TabNavigationContainer"
            component={TabNavigationContainer}
          />
        </Stack.Navigator>
      )}
    </ReactNavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    backgroundColor: "#ffffee",
    borderTopWidth: 1,
  },
});

export default NavigationContainer;
