import React, { useRef, useState, useEffect } from "react";
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
  Animated,
  Easing,
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";

import TextInputComponent from "../components/TextInputComponent";
import { useAuthentification } from "../Context/AuthContext";
import { useTranslation } from "../Context/TranslationContext";
import ToggleLangageComponent from "../components/ToggleLangageComponent";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("screen");

function ConnexionView(props) {
  const { login, signup } = useAuthentification();
  const { toggleLangage, langage, selectedLangage } = useTranslation();

  const [mailInput, setMailInput] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const errorOpacity = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  function onChangeEmail(text) {
    setMailInput(text);

    if (text.search("[0-9]") > -1) {
      Animated.timing(errorOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(errorOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }
  const animatedValue = new Animated.Value(0);
  const mailAnimatedValue = new Animated.Value(0);

  function handleAnimation(value) {
    // A loop is needed for continuous animation

    // Animation consists of a sequence of steps
    Animated.sequence([
      // start rotation in one direction (only half the time is needed)
      Animated.timing(value, {
        toValue: 1.0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // rotate in other direction, to minimum value (= twice the duration of above)
      Animated.timing(value, {
        toValue: -1.0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // return to begin position
      Animated.timing(value, {
        toValue: 0.0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }
  async function manageLogin() {
    setIsLoading(true);
    if (mailInput === "" || mailInput.search("@eleve.isep.fr") < 0) {
      handleAnimation(mailAnimatedValue);
      Animated.timing(errorOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setIsLoading(false);
    } else if (password === "") {
      handleAnimation(animatedValue);
      setIsLoading(false);
    } else {
      const request = await login(mailInput, password);
      console.warn("FINAL RESULT", request);
      switch (request) {
        case "LOGGED IN":
          setIsLoading(false);
          return;
        case "NETWORK":
          setIsLoading(false);
          setError({
            title: langage.networkErrorTitle,
            description: langage.networkErrorSubTitle,
          });
          setModalVisible(true);
          break;
        case "VERIFICATION":
          setIsLoading(false);
          setError({
            title: "Veuillez verifier vos mails",
            description:
              "Vous devez avoir vérifié votre adresse email pour pouvoir vous connecter.",
          });
          setModalVisible(true);
          break;
        case "PASSWORD":
          setIsLoading(false);
          setError({
            title: "Mot de passe incorrect",
            description: "Votre mot de passe est incorrect, merci de réessayer",
          });
          setModalVisible(true);
          break;
        case "EXISTANCE":
          let regex = /[a-zA-Z]+\.[a-zA-Z]+@eleve\.isep\.fr/i;

          let name = null;
          let lastname = null;
          if (regex.test(mailInput)) {
            let words = mailInput.split(".");
            name = words[0];
            lastname = words[1].split("@")[0];
          }
          console.warn(name, lastname);
          const result = await signup(
            mailInput,
            password,
            selectedLangage,
            name,
            lastname,
            (description = " "),
            (phoneNumber = "+33 6 73 63 32 07")
          );
          console.warn("SIGNUP RESULT", result);
          switch (result) {
            case "NETWORK":
              setIsLoading(false);
              setError({
                title: langage.networkErrorTitle,
                description: langage.networkErrorSubTitle,
              });
              setModalVisible(true);
              break;
            case "CREATED":
              setIsLoading(false);
              setError({
                title: "Votre compte a été créé !",
                description:
                  "Vous avez reçu un lien par email permettant de verifier votre adresse e-mail.",
              });
              setModalVisible(true);
              break;
            case "WRONG":
              setIsLoading(false);
              setError({
                title: "Votre compte n'a  pas pu être créé !",
                description: "Les informations rentrés semblent invalides",
              });
              setModalVisible(true);
              break;
            default:
              setIsLoading(false);
              setError({
                title: langage.networkErrorTitle,
                description: langage.networkErrorSubTitle,
              });
              setModalVisible(true);
              break;
          }
          break;
        default:
          setIsLoading(false);
          setError({
            title: langage.networkErrorTitle,
            description: langage.networkErrorSubTitle,
          });
          setModalVisible(true);
          break;
      }
    }
  }

  // const inputEmailPercent = 0.7;

  // const inputEmailPercent = useRef(0.7);

  // const inputEmailPercent = useRef(new Animated.Value(0.7)).current;
  const inputEmailPercent = useRef(new Animated.Value(0.7 * width)).current;
  const inputPasswordPercent = useRef(new Animated.Value(0.7 * width)).current;

  function onMailFocus() {
    Animated.timing(inputEmailPercent, {
      toValue: 0.9 * width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
  function onMailUnFocus() {
    Animated.timing(inputEmailPercent, {
      toValue: 0.7 * width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
  function onPasswordFocus() {
    Animated.timing(inputPasswordPercent, {
      toValue: 0.9 * width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }
  function onPasswordUnFocus() {
    Animated.timing(inputPasswordPercent, {
      toValue: 0.7 * width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        customBackdrop={
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{ flex: 1, width: "100%", backgroundColor: "white" }}
          ></Pressable>
        }
      >
        <View
          style={{
            width: "80%",
            minHeight: "20%",
            backgroundColor: "white",
            borderRadius: 20,
            alignSelf: "center",
            alignItems: "center",
            padding: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "ChangaOne_400Regular",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {error.title}
          </Text>
          <Text
            style={{
              fontFamily: "Neon",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {error.description}
          </Text>
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => toggleModal()}
          >
            <ColoredViewComponent
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage?.close}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isRegisterModalVisible}
        onSwipeComplete={() => setRegisterModalVisible(false)}
        swipeDirection="down"
        customBackdrop={
          <Pressable
            onPress={() => setRegisterModalVisible(false)}
            style={{ flex: 1, width: "100%", backgroundColor: "white" }}
          ></Pressable>
        }
      >
        <View
          style={{
            width: "80%",
            minHeight: "20%",
            backgroundColor: "white",
            borderRadius: 20,
            alignSelf: "center",
            alignItems: "center",
            padding: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "ChangaOne_400Regular",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {error.title}
          </Text>
          <Text
            style={{
              fontFamily: "Neon",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {error.description}
          </Text>
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => setRegisterModalVisible(false)}
          >
            <ColoredViewComponent
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage?.close}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        </View>
      </Modal>
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
        <Animated.View
          style={[
            {
              width: "100%",
              alignItems: "center",
            },
            {
              transform: [
                {
                  rotate: mailAnimatedValue.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ["-0.1rad", "0.1rad"],
                  }),
                },
              ],
            },
          ]}
        >
          <ColoredViewComponent
            containerStyle={{
              width: inputEmailPercent,
              marginBottom: Platform.OS === "android" ? 20 : 0,
              paddingBottom: 0,
              marginTop: 0,
            }}
            isBlue
          >
            <TextInputComponent
              // autoFocus
              onFocusCallBack={() => onMailFocus()}
              onUnFocuseCallBack={() => onMailUnFocus()}
              placeholder={langage.mailPlaceHolder}
              value={mailInput}
              onChange={onChangeEmail}
              keyboardType="email-address"
            />
          </ColoredViewComponent>
          <Animated.Text
            style={{
              alignSelf: "center",
              position: "absolute",
              opacity: errorOpacity,
              bottom: Platform.OS === "ios" ? -20 : 0,
            }}
          >
            Format : prénom.nom@eleve.isep.fr
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              width: "100%",
              alignItems: "center",
            },
            {
              transform: [
                {
                  rotate: animatedValue.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ["-0.1rad", "0.1rad"],
                  }),
                },
              ],
            },
          ]}
        >
          <ColoredViewComponent
            containerStyle={{
              width: inputPasswordPercent,
              marginBottom: Platform.OS === "android" ? 20 : 0,
              paddingBottom: 0,
              marginTop: 0,
            }}
            isBlue
          >
            <TextInputComponent
              // autoFocus
              onFocusCallBack={() => onPasswordFocus()}
              onUnFocuseCallBack={() => onPasswordUnFocus()}
              secureTextEntry
              placeholder={langage.passwordPlaceHolder}
              value={password}
              onChange={setPassword}
            />
          </ColoredViewComponent>
        </Animated.View>

        <View
          style={{
            width: "100%",
            alignItems: "center",

            justifyContent: "flex-end",
            flexShrink: 1,
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={{ position: "absolute", top: 10, zIndex: 2 }}
              color="#E65F02"
            />
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => manageLogin()}
            disabled={isLoading}
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
              opacity: isLoading ? 1 : 0.5,
              fontFamily: "ChangaOne_400Regular_Italic",
              marginBottom: Platform.OS === "ios" ? 0 : "10%",
            }}
          >
            {langage.firstConnexion}
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
