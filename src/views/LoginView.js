import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Switch,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";
import OutlinedText from "../components/OutlinedText";
import lettere from "../assets/Letters/Normal/e.png";
import letterF from "../assets/Letters/Normal/F.png";
import letterh from "../assets/Letters/Normal/h.png";
import letterl from "../assets/Letters/Normal/l.png";
import lettert from "../assets/Letters/Normal/t.png";
import { LogBox } from "react-native";
import { useTranslation } from "../Context/TranslationContext";
import { useAuthentification } from "../Context/AuthContext";
import { useTheme } from "../Context/theme/ThemeContext";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
import ToggleLangageComponent from "../components/ToggleLangageComponent";
import ToggleThemeComponent from "../components/ToggleThemeComponent";

import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("screen");
function LoginView(props) {
  const { login } = useAuthentification();
  const { toggleLangage, langage } = useTranslation();
  const { themeStyle } = useTheme();

  useEffect(() => {
    if (!langage) {
      toggleLangage();
    }
  });
  const gravityFontSize = useRef(new Animated.Value(50)).current;
  let actualSize = 50;
  function growGravity() {
    actualSize += 2;
    Animated.timing(gravityFontSize, {
      toValue: actualSize,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <StatusBar
        backgroundColor={themeStyle.background}
        hideTransitionAnimation="false"
      />

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

      <View style={styles.labelContainer}>
        <View style={styles.labelTextletterContainer}>
          <OutlinedText
            letterImage={letterF}
            fontHeight={32}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={24}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={24}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letterl}
            fontHeight={32}
            style={{ marginRight: 10 }}
          />

          <OutlinedText
            letterImage={lettert}
            fontHeight={32}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letterh}
            fontHeight={32}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={24}
            style={{ marginRight: 0 }}
          />
        </View>
        <Animated.Text
          onPress={() => growGravity()}
          style={[
            styles.labelText,
            {
              fontSize: gravityFontSize,
              zIndex: 2,
              position: "absolute",
              bottom: 10,
              color: themeStyle.text,
            },
          ]}
        >
          GRAVITY
        </Animated.Text>
      </View>

      <TouchableOpacity
        style={styles.buttonTouchableContainer}
        onPress={() => props.navigation.navigate("Connexion")}
      >
        <ColoredViewComponent
          isBlue
          coloredViewStyle={styles.buttonContainer}
          containerStyle={styles.buttonContainerContainer}
        >
          <Text style={styles.buttonText}>{langage?.connexionButton}</Text>
        </ColoredViewComponent>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 100,
          justifyContent: "space-between",
        }}
      >
        <ToggleThemeComponent />

        <ToggleLangageComponent />
      </View>
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
  },
  nameContainer: {
    width: "100%",
    height: 100,
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
    height: 150,
    justifyContent: "center",
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
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default LoginView;
