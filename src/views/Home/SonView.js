import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ColorViewComponent from "../../components/ColoredViewComponent.js";
import { useTranslation } from "../../Context/TranslationContext";

const { width, height } = Dimensions.get("screen");
function SonView(props) {
  const { langage } = useTranslation();

  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity onPress={() => console.log("Chat")}>
        <ColorViewComponent coloredViewStyle={[styles.titleContainer]}>
          <Text style={styles.titleText}>{langage.openOnYoutube}</Text>
        </ColorViewComponent>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  titleContainer: {
    width: width * 0.5,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
  bodyContainer: {
    marginTop: 10,

    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "Neon",
    textAlign: "center",
    fontSize: 30,
  },
  textSmall: {
    fontFamily: "Neon",
    textAlign: "center",
    lineHeight: 33,
    fontSize: 20,
  },
});

export default SonView;
