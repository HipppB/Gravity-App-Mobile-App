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
  StatusBar,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";

import TextInputComponent from "../components/TextInputComponent";
import { useAuthentification } from "../Context/AuthContext";
import { useTranslation } from "../Context/TranslationContext";
import ToggleLangageComponent from "../components/ToggleLangageComponent";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const { width, height } = Dimensions.get("screen");

function ConnexionView(props) {
  const { login } = useAuthentification();
  const { toggleLangage, langage } = useTranslation();

  const [mailInput, setMailInput] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "white" }}>
      <StatusBar
        backgroundColor="white"
        hideTransitionAnimation="true"
        animated={false}
      />
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
        <View
          style={{
            width: "100%",
            alignItems: "center",

            justifyContent: "flex-end",
            flexShrink: 1,
          }}
        >
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
          <Text
            style={{
              marginTop: 5,
              textAlign: "center",
              opacity: 0.5,
              fontFamily: "ChangaOne_400Regular_Italic",
            }}
          >
            Première connexion ? {"\n"} Un mail de vérification vous sera envoyé
            !
          </Text>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          alignItems: "center",
          paddingTop: Platform.OS === "android" ? "10%" : 0,
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
          top: StatusBar.currentHeight,
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
    marginBottom: Platform.OS === "android" ? 20 : 0,
    paddingBottom: 0,
    marginTop: 0,
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
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: 0,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default ConnexionView;
