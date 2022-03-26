import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import colorsDark from "./styleDark";
import colorsLight from "./styleLight";
const ThemeContext = createContext({
  toggleTheme: () => {},
  themeStyle: {},
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
      console.error("BIG ERROR", e);
    }
  };
  async function retrieveTheme() {
    try {
      const theme = await AsyncStorage.getItem("@theme");
      return theme;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        themeStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };