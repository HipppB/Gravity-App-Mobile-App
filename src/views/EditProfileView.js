import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Animated,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "../Context/TranslationContext";
import { useAuthentification } from "../Context/AuthContext";

import ColoredViewComponent from "../components/ColoredViewComponent.js";
import TextInputComponent from "../components/TextInputComponent.js";
import { ScrollView } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import BackButtonComponent from "../components/BackButtonComponent.js";
const { width, height } = Dimensions.get("screen");
function EditProfileView(props) {
  const { langage } = useTranslation();
  const { userInfos } = useAuthentification();

  const [name, setName] = useState(userInfos?.first_name);
  const [lastName, setLastName] = useState(userInfos?.last_name);
  const [phone, setPhone] = useState(userInfos?.phone_number);
  const [approximativeLocation, setApproximativeLocation] = useState("");
  const [insta, setInsta] = useState("");
  const [snap, setSnap] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tikTok, setTikTok] = useState("");
  const [profileUrl, setProfileUrl] = useState(userInfos.profile_picture);
  const loadingopacity = useRef(new Animated.Value(0)).current;

  async function changePhoto() {
    const result = await launchImageLibrary({ mediaType: "photo" });

    setProfileUrl(result.assets[0].uri);
  }

  async function saveInfos() {
    Animated.timing(loadingopacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(
      () =>
        Animated.timing(loadingopacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(),
      1000
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          width: "100%",
          flex: 1,
          paddingBottom: 0,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackButtonComponent navigation={props.navigation} />

        <ScrollView
          style={{
            width: "100%",
            height: "auto",
            paddingBottom: 0,
          }}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => changePhoto()}
            style={{
              width: 0.4 * width,
              height: 0.4 * width,
              borderRadius: width,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: profileUrl }}
              style={{
                width: 0.4 * width,
                height: 0.4 * width,
                borderColor: "#E65F02",
                borderWidth: 2,
                borderRadius: width,
                resizeMode: "cover",
              }}
            />
            <Image
              source={require("../assets/images/camera.png")}
              style={{
                position: "absolute",
                width: 0.2 * width,
                height: 0.2 * width,
                tintColor: "#E65F02",
              }}
            />
          </TouchableOpacity>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.namePlaceHolder}
              value={name}
              onChange={setName}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.lastnamePlaceHolder}
              value={lastName}
              onChange={setLastName}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.phonePlaceHolder}
              value={phone}
              onChange={setPhone}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.locationPlaceHolder}
              value={approximativeLocation}
              onChange={setApproximativeLocation}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.instaPlaceHolder}
              value={insta}
              onChange={setInsta}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.facebookPlaceHolder}
              value={facebook}
              onChange={setFacebook}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.snapPlaceHolder}
              value={snap}
              onChange={setSnap}
            />
          </ColoredViewComponent>
          <ColoredViewComponent containerStyle={styles.labelContainer} isBlue>
            <TextInputComponent
              // autoFocus
              placeholder={langage.tiktokPlaceHolder}
              value={tikTok}
              onChange={setTikTok}
            />
          </ColoredViewComponent>
          <View style={styles.buttonTouchableContainer}>
            <Animated.Text
              style={{
                alignSelf: "center",
                opacity: loadingopacity,
                fontFamily: "ChangaOne_400Regular_Italic",
              }}
            >
              {langage.isSaving}
            </Animated.Text>
            <TouchableOpacity onPress={() => saveInfos()}>
              <ColoredViewComponent
                coloredViewStyle={styles.buttonContainer}
                containerStyle={styles.buttonContainerContainer}
              >
                <Text style={styles.buttonText}>{langage?.saveLabel}</Text>
              </ColoredViewComponent>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    marginTop: 30,
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
  labelContainer: {
    width: "70%",

    marginTop: 20,
  },
  buttonTouchableContainer: {
    marginTop: 40,
    width: "70%",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: Platform.OS === "android" ? 0 : 0,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
  realtitleContainer: {
    marginBottom: 30,
    marginTop: 20,
    width: width * 0.7,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
});

export default EditProfileView;
