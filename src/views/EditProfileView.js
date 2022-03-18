import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import ColorViewComponent from "../components/ColoredViewComponent.js";
import { useTranslation } from "../Context/TranslationContext";
import ToggleLangageComponent from "../components/ToggleLangageComponent.js";
import ColoredViewComponent from "../components/ColoredViewComponent.js";
import TextInputComponent from "../components/TextInputComponent.js";
import { ScrollView } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const { width, height } = Dimensions.get("screen");
function EditProfileView(props) {
  const { toggleLangage, langage } = useTranslation();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+33 ");
  const [approximativeLocation, setApproximativeLocation] = useState("");
  const [insta, setInsta] = useState("");
  const [snap, setSnap] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tikTok, setTikTok] = useState("");

  async function changePhoto() {
    const result = await launchImageLibrary({ mediaType: "photo" });

    console.log("ASK FOR CHANGE");
  }
  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
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
              source={require("../GravityHeadCrush/images/1.png")}
              style={{
                width: 0.4 * width,
                height: 0.4 * width,
                backgroundColor: "black",
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
                tintColor: "white",
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
});

export default EditProfileView;
