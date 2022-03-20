import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import BackButtonComponent from "../components/BackButtonComponent";

import email from "../assets/icons/email.png";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import phone from "../assets/icons/phone.png";
import snapchat from "../assets/icons/snapchat.png";
import tiktok from "../assets/icons/tiktok.png";

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
function PublicProfilView(props) {
  const num = ((Math.random() * 60) % 6).toFixed(0);

  return (
    <View
      style={{ padding: 20, paddingTop: 30, flex: 1, backgroundColor: "white" }}
    >
      <View style={{ position: "absolute", top: 0 }}>
        <BackButtonComponent
          navigation={props.navigation}
          top={Platform.OS == "ios" ? 30 : 0}
        />
      </View>
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
      <Text numberOfLines={1} style={styles.pageTitle}>
        Personne Random n°{num}
      </Text>
      <ScrollView
        style={{
          width: "100%",
          height: "auto",
          paddingBottom: 0,
        }}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageSubTitle}>Description à tomber</Text>
        <Text>
          Cette page n'est pas encore prête, mais vous pouvez prendre quelque
          secondes pour admirer cette magnifique tête choisie au hasard parmis
          les têtes du bureau. N'hésitez cependant pas à donner vos idées
        </Text>
        <Text style={styles.pageSubTitle}>Contacts et réseaux</Text>

        <Item icon={instagram} contact={"Xx__SnapDekevinDu75__xX"} />
        <Item icon={tiktok} contact={"Xx__SnapDekevinDu75__xX"} />
        <Item icon={snapchat} contact={"Xx__SnapDekevinDu75__xX"} />

        <Item icon={facebook} contact={"Xx__SnapDekevinDu75__xX"} />
        <Item icon={phone} contact={"+ 33 6 07 48 34 54"} />
        <Item icon={email} contact={"Jean.kevin@eleve.isep.fr"} />
      </ScrollView>
    </View>
  );
}

function Item({ icon, contact }) {
  if (Math.random() > 1.5) return <View></View>;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        width: "100%",
      }}
    >
      <Image
        source={icon}
        style={{ width: 30, height: 30, margin: 10, marginLeft: 0 }}
      />
      <Text>{contact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  pageSubTitle: {
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,

    width: "100%",
  },
});

export default PublicProfilView;
