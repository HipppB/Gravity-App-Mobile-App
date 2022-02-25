import React, { ReactPropTypes, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";
import { useFonts } from "expo-font";

import TextInputComponent from "../components/TextInputComponent";
import { useAuthentification } from "../Context/AuthContext";
function ConnexionView(props) {
  const { login } = useAuthentification();
  let [fontsLoaded] = useFonts({
    "Modern-Deco": require("../assets/fonts/Modern-Deco.ttf"),
  });
  const [mailInput, setMailInput] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>Animation logo</Text>
        <Text>version noir</Text>
        <Text>GRAVITY</Text>
      </View>

      <ColoredViewComponent
        coloredViewStyle={styles.nameContainer}
        containerStyle={styles.nameContainerContainer}
        isBlue
      >
        <Text style={styles.nameText}>Connexion</Text>
      </ColoredViewComponent>

      <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
        <TextInputComponent
          placeholder="mail Isep"
          value={mailInput}
          onChange={setMailInput}
        />
      </ColoredViewComponent>

      <TouchableOpacity
        style={styles.buttonTouchableContainer}
        onPress={() => login()}
      >
        <ColoredViewComponent
          coloredViewStyle={styles.buttonContainer}
          containerStyle={styles.buttonContainerContainer}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </ColoredViewComponent>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logoContainer: {},
  nameContainerContainer: {
    width: "70%",
    alignItems: "center",
    marginBottom: 30,
  },
  nameContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
  },
  nameText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 25,
  },
  labelContainer: {
    width: "70%",
    marginBottom: 50,
  },
  labelText: {
    color: "black",
    fontSize: 50,
    fontFamily: "ChangaOne_400Regular_Italic",
  },
  labelTextletterContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  labelTextLetter: {
    width: 20,
    height: 30,
    resizeMode: "contain",

    tintColor: "black",
    backgroundColor: "red",
  },
  buttonTouchableContainer: {
    width: "70%",
    justifyContent: "center",
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default ConnexionView;
