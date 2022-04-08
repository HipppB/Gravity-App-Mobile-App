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
import { useTheme } from "../Context/theme/ThemeContext";
import ToggleThemeComponent from "../components/ToggleThemeComponent.js";
import BackButtonComponent from "../components/BackButtonComponent";

const { width, height } = Dimensions.get("screen");
function AccountView(props) {
  const { toggleLangage, langage } = useTranslation();
  const { logout, userInfos } = useAuthentification();
  const { themeStyle } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeStyle.background }]}
    >
      <StatusBar
        backgroundColor={themeStyle.background}
        hideTransitionAnimation="true"
        animated={false}
      />
      <BackButtonComponent
        navigation={props.navigation}
        top={Platform.OS == "ios" ? 60 : 0}
        color={"white"}
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
          onPress={() =>
            props.navigation.navigate("PublicProfil", { id: userInfos.id })
          }
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 100,
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <ToggleThemeComponent />

          <ToggleLangageComponent />
        </View>
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
