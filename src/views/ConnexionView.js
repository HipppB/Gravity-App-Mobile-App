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
  ScrollView,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";

import TextInputComponent from "../components/TextInputComponent";
import { useAuthentification } from "../Context/AuthContext";
import { useTranslation } from "../Context/TranslationContext";
import { useTheme } from "../Context/theme/ThemeContext";

import ToggleLangageComponent from "../components/ToggleLangageComponent";
import Modal from "react-native-modal";
import useFetch from "../data/useFetch";

const { width, height } = Dimensions.get("screen");

function ConnexionView(props) {
  const { login, signup } = useAuthentification();
  const { langage, selectedLangage } = useTranslation();
  const [request, newRequest] = useFetch();
  const { themeStyle } = useTheme();

  const [mailInput, setMailInput] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const errorOpacity = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [selectedPromo, setPromo] = useState(null);
  const [selectedDestination, setDestination] = useState(null);
  const [resendMailbutton, setResendMailbutton] = useState(true);

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

  async function manageRegister() {
    setRegisterModalVisible(false);
    let regex = /[a-zA-Z]+\.[a-zA-Z]+@eleve\.isep\.fr/i;

    let name = null;
    let lastname = null;
    if (regex.test(mailInput)) {
      let words = mailInput.split(".");
      name = words[0];
      lastname = words[1].split("@")[0];
    }
    console.log(name, lastname, selectedPromo);
    const result = await signup({
      email: mailInput,
      password: password,
      language: selectedLangage,
      promo: selectedPromo,
      destination: selectedDestination,
      name: name,
      lastname: lastname,
    });
    console.log("SIGNUP RESULT", result);
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
        setError({
          title: langage.accountCreated,
          description: langage.accountCreatedDesc,
        });

        setTimeout(() => {
          setModalVisible(true), setIsLoading(false);
        }, 200);
        return;
        break;
      case "WRONG":
        setError({
          title: langage.accountNotCreated,
          description: langage.accountNotCreatedDesc,
        });
        setTimeout(() => {
          setModalVisible(true), setIsLoading(false);
        }, 200);
        break;
      default:
        setError({
          title: langage.networkErrorTitle,
          description: langage.networkErrorSubTitle,
        });
        setTimeout(() => {
          setModalVisible(true), setIsLoading(false);
        }, 200);
        break;
    }
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
      console.log("FINAL RESULT", request);
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
            title: langage.checkMail,
            description: langage.checkMailDesc,
          });
          setResendMailbutton(true);

          setModalVisible(true);
          break;
        case "PASSWORD":
          setIsLoading(false);
          setError({
            title: langage.wrongPassword,
            description: langage.wrongPasswordDesc,
          });
          setModalVisible(true);
          break;
        case "EXISTANCE":
          setRegisterModalVisible(true);
          setIsLoading(false);
          return;

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
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: themeStyle.background,
            }}
          ></Pressable>
        }
      >
        <View
          style={{
            width: "80%",
            minHeight: "20%",
            backgroundColor: themeStyle.background,
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
              color: themeStyle.textless,
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
              color: themeStyle.textless,
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
          {error.title === langage.checkMail && resendMailbutton ? (
            <Text
              style={{
                marginTop: 15,
                marginBottom: 5,
                textAlign: "center",
                opacity: 0.5,
                fontFamily: "ChangaOne_400Regular_Italic",
              }}
              onPress={async () => {
                newRequest("auth/confirmation/resend/" + mailInput, "POST");
                setResendMailbutton(false);
                toggleModal();
              }}
            >
              Renvoyer le mail.
            </Text>
          ) : (
            <></>
          )}
        </View>
      </Modal>
      <ModalInscription
        langage={langage}
        isVisible={isRegisterModalVisible}
        setVisible={setRegisterModalVisible}
        selectedPromo={selectedPromo}
        setPromo={setPromo}
        callBack={manageRegister}
        setDestination={setDestination}
        selectedDestination={selectedDestination}
      />
      <StatusBar
        backgroundColor={themeStyle.background}
        hideTransitionAnimation="true"
        animated={false}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: themeStyle.background }]}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: themeStyle.background },
        ]}
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
          <Animated.Text
            style={{
              alignSelf: "center",
              position: "absolute",
              opacity: errorOpacity,
              // bottom: Platform.OS === "ios" ? -20 : 0,
              top: -25,
              textAlign: "center",
              opacity: 0.5,
              fontFamily: "ChangaOne_400Regular_Italic",
              backgroundColor: themeStyle.background,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 50,
              color: themeStyle.text,
            }}
          >
            {langage.mailFormat}
          </Animated.Text>
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
              color: themeStyle.text,
              marginTop: 5,
              textAlign: "center",
              opacity: isLoading ? 1 : 0.5,
              fontFamily: "ChangaOne_400Regular_Italic",
              marginBottom: Platform.OS === "ios" ? 0 : "10%",
            }}
          >
            {resendMailbutton ? langage.firstConnexion : langage.mailSend}
          </Text>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: themeStyle.background,
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

function ModalInscription({
  langage,
  isVisible,
  setVisible,
  selectedPromo,
  selectedDestination,
  setDestination,
  setPromo,
  callBack,
}) {
  const { themeStyle } = useTheme();

  const promos = [
    { id: "i1", disp: "I1" },
    { id: "p1", disp: "P1" },
    { id: "i2", disp: "I2" },
    { id: "p2", disp: "P2" },
    { id: "A1", disp: "A1" },
    { id: "A2", disp: "A2" },
    { id: "A3", disp: "A3" },
  ];

  const destinations = [
    { id: "prague", disp: langage.countries.prague },
    { id: "paris", disp: langage.countries.paris },
    { id: "canada", disp: langage.countries.canada },
    { id: "coree", disp: langage.countries.coree },
    { id: "riga", disp: langage.countries.riga },
    { id: "pdg", disp: langage.countries.pdg },
  ];
  return (
    <Modal
      isVisible={isVisible}
      // onSwipeComplete={() => setVisible(false)}
      // swipeDirection="down"
      propagateSwipe
      customBackdrop={
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: themeStyle.background,
          }}
        ></Pressable>
      }
    >
      <View
        style={{
          width: "90%",
          minHeight: "20%",
          backgroundColor: themeStyle.background,
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
            color: themeStyle.textless,
          }}
        >
          {langage.signup}
        </Text>
        <Text
          style={{
            fontFamily: "Neon",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center",
            color: themeStyle.textless,
          }}
        >
          {langage.noAccountLinked}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 20,
          }}
        >
          {promos.map((promo) => (
            <TouchableOpacity
              key={promo.id}
              style={{
                backgroundColor:
                  promo.id == selectedPromo ? "#E65F02" : "#F4C182",
                justifyContent: "center",
                alignItems: "center",
                width: 30,
                height: 30,
                borderRadius: 20,
              }}
              onPress={() => setPromo(promo.id)}
            >
              <Text
                style={{
                  color: themeStyle.background,
                  fontSize: 15,
                  fontFamily: "ChangaOne_400Regular",
                  opacity: 0.7,
                }}
              >
                {promo.disp}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedPromo === "i2" ? (
          <ScrollView
            horizontal
            style={{ width: "100%", marginBottom: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            {destinations.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={{
                  backgroundColor:
                    destination.id == selectedDestination
                      ? "#E65F02"
                      : "#F4C182",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,

                  paddingHorizontal: 10,
                  height: 30,
                  borderRadius: 10,
                }}
                onPress={() => setDestination(destination.id)}
              >
                <Text
                  style={{
                    color: themeStyle.background,
                    fontSize: 15,
                    fontFamily: "ChangaOne_400Regular",
                    opacity: 0.7,
                  }}
                >
                  {destination.disp}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <></>
        )}
        {selectedPromo && (selectedPromo !== "i2" || selectedDestination) ? (
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => callBack()}
          >
            <ColoredViewComponent
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage.goSignup}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => setVisible(false)}
          >
            <ColoredViewComponent
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage.cancel}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
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
