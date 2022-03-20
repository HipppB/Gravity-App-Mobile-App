import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import BackButtonComponent from "../components/BackButtonComponent";
import Clipboard from "@react-native-clipboard/clipboard";

import email from "../assets/icons/email.png";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import phone from "../assets/icons/phone.png";
import snapchat from "../assets/icons/snapchat.png";
import tiktok from "../assets/icons/tiktok.png";
import ColoredViewComponent from "../components/ColoredViewComponent";
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
        <Text style={styles.description}>
          Si vous avez des suggestion pour cette page n'hésitez pas, je trouve
          personnllement qu'elle manque un peu de couleur. Tout les retours sont
          bon à prendre !
        </Text>
        <Text style={styles.pageSubTitle}>Contacts et réseaux</Text>

        <Item
          network={"instagram"}
          icon={instagram}
          contact={"Xx__InstaDekevinDu75__xX"}
        />
        <Item
          network={"tiktok"}
          icon={tiktok}
          contact={"Xx__TikTokDekevinDu75__xX"}
        />
        <Item
          network={"snapchat"}
          icon={snapchat}
          contact={"Xx__SnapDekevinDu75__xX"}
        />

        <Item
          network={"facebook"}
          icon={facebook}
          contact={"Xx__FacebookDekevinDu75__xX"}
        />
        <Item network={"phone"} icon={phone} contact={"+ 33 6 07 48 34 54"} />
        <Item
          network={"email"}
          icon={email}
          contact={"Jean.kevin@eleve.isep.fr"}
        />
      </ScrollView>
    </View>
  );
}

function Item({ icon, contact, network }) {
  if (Math.random() > 1.5) return <View></View>;
  function openSocialLink() {
    switch (network) {
      case "instagram":
        Linking.openURL("https://www.instagram.com/" + contact);
        break;
      case "tiktok":
        Linking.openURL("https://www.tiktok.com/@" + contact);
        break;

      case "snapchat":
        Linking.openURL("https://www.snapchat.com/add/" + contact);
        break;
      case "facebook":
        Linking.openURL("https://www.instagram.com/" + contact);
        break;
      default:
        Clipboard.setString(contact);

        break;
    }
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
      onPress={() => openSocialLink()}
    >
      <ColoredViewComponent
        containerStyle={{
          borderRadius: 105,

          margin: 10,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          elevation: 0,
          alignItems: "center",
        }}
        coloredViewStyle={{
          width: 40,
          height: 40,
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <Image
          source={icon}
          style={{
            width: 25,
            height: 25,
            tintColor: "white",
          }}
        />
      </ColoredViewComponent>
      <Text style={styles.pseudo}>{contact}</Text>
    </TouchableOpacity>
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
    color: "#172D35",
  },
  pageSubTitle: {
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    color: "#172D35",
    width: "100%",
  },
  pseudo: {
    fontFamily: "ChangaOne_400Regular",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    color: "#ED8A33",
  },
  description: {
    fontFamily: "Neon",
    fontSize: 20,
  },
});

export default PublicProfilView;
