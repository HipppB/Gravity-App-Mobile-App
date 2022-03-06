import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import french from "../assets/images/france.png";
import english from "../assets/images/united-kingdom.png";
import { useTranslation } from "../Context/TranslationContext";

function ToggleLangageComponent(props) {
  const { toggleLangage, langage, selectedLangage } = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => toggleLangage()}>
      <Image
        source={selectedLangage === "fr" ? english : french}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    height: 40,
    width: 40,
  },
});

export default ToggleLangageComponent;
