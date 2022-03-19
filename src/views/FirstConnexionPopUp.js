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
    <SafeAreaView>
      <BackButtonComponent navigation={props.navigation} />
      <Text>
        Pop Up de bienvenue, n'apparait que lors de la premiere connexion (A
        chaque redemarrage de l'appli pour les testeurs)
      </Text>
      <Image
        source={heads[num]}
        style={{
          width: 0.4 * width,
          height: 0.4 * width,
          backgroundColor: "black",
          borderRadius: width,
          resizeMode: "cover",
          alignSelf: "center",
        }}
      />
      <ScrollView
        style={{
          width: "100%",
          height: "auto",
          paddingBottom: 0,
        }}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text>
          Cette page n'est pas encore prête, mais vous pouvez prendre quelque
          secondes pour admirer cette magnifique tête choisie au hasard parmis
          les têtes du bureau
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default FirstConnexionPopUp;
