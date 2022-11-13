import React, { useEffect } from "react";
import NavigationContainer from "./app/navigation/Navigation";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { ThemeContext } from "./app/context/theme-context";
import { store } from "./app/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { AuthProvider } from "./app/navigation/AuthProvider";
import "@react-native-firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeKey = "light" | "dark";

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<ThemeKey>("light");
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    handleAsyncStorage(nextTheme);

    setTheme(nextTheme);
  };

  const getAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@theme");
      if (value !== null) {
        if (value.toString() === "dark") {
          setTheme("dark");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAsyncStorage = async (theme: string) => {
    try {
      await AsyncStorage.setItem("@theme", theme);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAsyncStorage();
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AuthProvider>
            <ReduxProvider store={store}>
              <AlertNotificationRoot>
                <NavigationContainer />
              </AlertNotificationRoot>
            </ReduxProvider>
          </AuthProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
