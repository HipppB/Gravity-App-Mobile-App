import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import colorsDark from "./styleDark";
import colorsLight from "./styleLight";
const ThemeContext = createContext({
  toggleTheme: () => {},
  themeStyle: {},
  activeTheme: "",
});

// create context
function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();

  const [activeTheme, setTheme] = useState(colorScheme);
  const [themeStyle, setThemeStyle] = useState(
    activeTheme === "dark" ? colorsDark : colorsLight
  );
  useEffect(() => {
    setTheme(colorScheme);
    setThemeStyle(colorScheme === "dark" ? colorsDark : colorsLight);
  }, [colorScheme]);
  const storeTheme = async (theme) => {
    try {
      await AsyncStorage.setItem("@theme", theme);
    } catch (e) {
      console.warn(e);
    }
  };
  async function retrieveTheme() {
    try {
      const theme = await AsyncStorage.getItem("@theme");
      return theme;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }
  function toggleTheme() {
    console.log(activeTheme);
    if (activeTheme === "light") {
      setThemeStyle(colorsDark);
      setTheme("dark");
    } else {
      setThemeStyle(colorsLight);
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        themeStyle,
        activeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
