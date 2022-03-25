import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorViewComponent from "../components/ColoredViewComponent.js";
import { useTranslation } from "../Context/TranslationContext";
import ToggleLangageComponent from "../components/ToggleLangageComponent.js";
import { useAuthentification } from "../Context/AuthContext";
const { width, height } = Dimensions.get("screen");
function AccountView(props) {
  const { toggleLangage, langage } = useTranslation();
  const { logout } = useAuthentification();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="white"
        hideTransitionAnimation="true"
        animated={false}
      />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logos/Couleur/Logo.png")}
          style={{
            maxWidth: width * 0.65,
            maxHeight: width * 0.65,
            resizeMode: "contain",
          }}
        />

        <TouchableOpacity
          onPress={() => props.navigation.navigate("PublicProfil")}
        >
          <ColorViewComponent coloredViewStyle={styles.realtitleContainer}>
            <Text style={styles.titleText}>{langage.myAccount}</Text>
          </ColorViewComponent>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          paddingTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("EditAccount")}
          style={{ marginBottom: 20 }}
        >
          <ColorViewComponent coloredViewStyle={[styles.titleContainer]} isBlue>
            <Text style={styles.titleText}>{langage.editProfile}</Text>
          </ColorViewComponent>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.push("Chat")}
          style={{ marginBottom: 20 }}
        >
          <ColorViewComponent coloredViewStyle={[styles.titleContainer]} isBlue>
            <Text style={styles.titleText}>{langage.contactButton}</Text>
          </ColorViewComponent>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <ColorViewComponent coloredViewStyle={[styles.titleContainer]} isBlue>
            <Text style={styles.titleText}>{langage.disconnect}</Text>
          </ColorViewComponent>
        </TouchableOpacity>

        <ToggleLangageComponent containerStyle={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  realtitleContainer: {
    marginBottom: Platform.OS === "ios" ? 40 : 0,

    width: width * 0.5,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  titleContainer: {
    // marginBottom: Platform.OS === "ios" ? 40 : 0,

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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "yellow",
    flexShrink: 1,
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
});

export default AccountView;
