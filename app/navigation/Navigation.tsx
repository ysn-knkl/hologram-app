import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer as ReactNavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Charts from "../screen/charts/Charts";
import Cards from "../screen/cards/Cards";
import Barcode from "../screen/barcode/Barcode";
import Profile from "../screen/profile/Profile";
import TabbarIcon from "./components/TabBarIcon";
import Login from "../screen/auth/Login";
import SignUp from "../screen/auth/SignUp";
import { auth } from "../firebase";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Routes } from "../constant/routes";

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
      <Tab.Screen name={Routes.CHARTS} component={Charts} />
      <Tab.Screen name={Routes.CARDS} component={Cards} />
      <Tab.Screen name={Routes.BARCODE} component={Barcode} />
      <Tab.Screen name={Routes.PROFİLE} component={Profile} />
    </Tab.Navigator>
  );
};

const NavigationContainer: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initializing, setInitializing] = useState(false);


  // Handle user state changes
  function onAuthStateChanged(user:FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <ReactNavigationContainer>
      {!user ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
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
