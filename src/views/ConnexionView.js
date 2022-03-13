import React, { ReactPropTypes, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";

import TextInputComponent from "../components/TextInputComponent";
import { useAuthentification } from "../Context/AuthContext";
import { useTranslation } from "../Context/TranslationContext";
import ToggleLangageComponent from "../components/ToggleLangageComponent";
const { width, height } = Dimensions.get("screen");

function ConnexionView(props) {
  const { login } = useAuthentification();
  const { toggleLangage, langage } = useTranslation();

  const [mailInput, setMailInput] = useState("");
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logos/Couleur/Logo.png")}
          style={{
            width: width * 0.8,
            height: width * 0.8,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* <ColoredViewComponent
        coloredViewStyle={styles.nameContainer}
        containerStyle={styles.nameContainerContainer}
        isBlue
      >
        <Text style={styles.nameText}>Connexion</Text>
      </ColoredViewComponent> */}

      <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
        <TextInputComponent
          autoFocus
          placeholder={langage.mailPlaceHolder}
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
          <Text style={styles.buttonText}>{langage?.connexionButton}</Text>
        </ColoredViewComponent>
      </TouchableOpacity>
      <View style={{ position: "absolute", bottom: 30 }}>
        <ToggleLangageComponent />
      </View>
    </KeyboardAvoidingView>
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
