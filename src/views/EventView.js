import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import HeaderComponenent from "../components/HeaderComponenent";
import { useTranslation } from "../Context/TranslationContext";

const { width, height } = Dimensions.get("screen");

function EventView(props) {
  const { toggleLangage, langage } = useTranslation();

  return (
    <View style={styles.container}>
      <HeaderComponenent navigation={props.navigation} />
      <View style={styles.bodyContainer}>
        <View style={styles.noSponsorContainer}>
          <Text style={styles.noSponsorText}>
            {langage.noGame}
            {"\n"}
            {langage.comeBackLater}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.05,
    backgroundColor: "white",
    justifyContent: "space-between",
    height: "100%",

    display: "flex",
  },
  bodyContainer: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  noSponsorContainer: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  noSponsorText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Neon",
  },
});
export default EventView;
