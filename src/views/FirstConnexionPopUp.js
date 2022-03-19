import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButtonComponent from "../components/BackButtonComponent";
const heads = [
  require("../GravityHeadCrush/images/1.png"),
  require("../GravityHeadCrush/images/2.png"),
  require("../GravityHeadCrush/images/3.png"),
  require("../GravityHeadCrush/images/4.png"),
  require("../GravityHeadCrush/images/5.png"),
  require("../GravityHeadCrush/images/6.png"),
  require("../GravityHeadCrush/images/8.png"),
  require("../GravityHeadCrush/images/9.png"),
];
const { width, height } = Dimensions.get("window");

function FirstConnexionPopUp(props) {
  const num = ((Math.random() * 60) % 6).toFixed(0);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <BackButtonComponent navigation={props.navigation} />

      <Image
        source={require("../assets/images/logos/Couleur/Logo.png")}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <ScrollView
        style={{
          width: "100%",
          height: "auto",
          paddingBottom: 0,
        }}
        contentContainerStyle={{ alignItems: "center", padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>
          Hello [Prénom] ! {"\n"}Merci d’avoir téléchargé notre application !
          {"\n"}
          Aventure-toi [avec asso] dans notre galaxie avec [GravityApp] comme
          seul guide et Feel the Gravity toute la semaine ✨ {"\n"}
          {"\n"} La Graviteam 💙🧡
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    lineHeight: 25,
    fontFamily: "Neon",
  },
});

export default FirstConnexionPopUp;
