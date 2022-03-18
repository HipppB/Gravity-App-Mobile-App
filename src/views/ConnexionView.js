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
  Platform,
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
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.container}
        behavior={Platform.OS === "ios" ? "position" : "height"}
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
            // autoFocus
            placeholder={langage.mailPlaceHolder}
            value={mailInput}
            onChange={setMailInput}
            keyboardType="email-address"
          />
        </ColoredViewComponent>
        <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
          <TextInputComponent
            // autoFocus
            secureTextEntry
            placeholder={langage.passwordPlaceHolder}
            value={password}
            onChange={setPassword}
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
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          alignItems: "center",
        }}
      >
        <ToggleLangageComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    justifyContent: Platform.OS === "android" ? "flex-end" : "space-evenly",
    alignItems: "center",
  },
  logoContainer:
    Platform.OS === "android"
      ? {
          position: "absolute",
          top: 0,
        }
      : {},
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
    marginBottom: 0,
    paddingBottom: 0,
    marginTop: 0,
    backgroundColor: "red",
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
    marginBottom: Platform.OS === "android" ? 100 : 0,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default ConnexionView;
