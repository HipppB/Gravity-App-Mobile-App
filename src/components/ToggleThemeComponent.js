import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import sun from "../assets/icons/sun.png";
import moon from "../assets/icons/moon.png";
import { useTranslation } from "../Context/TranslationContext";
import { useAuthentification } from "../Context/AuthContext";
import { useTheme } from "../Context/theme/ThemeContext";
function ToggleLangageComponent(props) {
  const { apiToken } = useAuthentification();
  const { toggleTheme, activeTheme } = useTheme();
  const { toggleLangage, langage, selectedLangage } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        // { backgroundColor: activeTheme === "light" ? "" : "#cacedb" },
        props?.containerStyle,
      ]}
      onPress={() => toggleTheme()}
    >
      <Image
        source={activeTheme === "light" ? moon : sun}
        style={[
          styles.icon,
          { tintColor: activeTheme === "light" ? "#F4C182" : "#F4C182" },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 2,
  },
  icon: {
    height: 38,
    width: 38,
  },
});

export default ToggleLangageComponent;
