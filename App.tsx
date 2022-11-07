import React from "react";
import NavigationContainer from "./app/navigation/Navigation";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { ThemeContext } from "./app/context/theme-context";

type ThemeKey = "light" | "dark";

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<ThemeKey>("light");
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <NavigationContainer />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
