import React, { useEffect, useState } from "react";
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
import twitter from "../assets/icons/twitter.png";
import snapchat from "../assets/icons/snapchat.png";
import tiktok from "../assets/icons/tiktok.png";
import ColoredViewComponent from "../components/ColoredViewComponent";
import { useTranslation } from "../Context/TranslationContext";
import { useTheme } from "../Context/theme/ThemeContext";
import { useAuthentification } from "../Context/AuthContext";
import useFetch from "../data/useFetch";
import getImage from "../components/data/getImage";
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
function PublicProfilView({ route, navigation }) {
  const id = route.params.id;
  const { langage } = useTranslation();
  const { themeStyle } = useTheme();
  const { apiToken } = useAuthentification();
  const [request, newRequest] = useFetch();
  const [profile, setProfile] = useState();
  const [profilePicture, setProfilePicture] = useState();
  useEffect(() => {
    if (id) {
      newRequest("user/profile/public/" + id, "GET", {}, apiToken);
    }
  }, []);
  useEffect(() => {
    if (request?.status === "Done") {
      setProfile(request.content);
      if (request?.content?.profile_picture) {
        getImage(
          request?.content?.profile_picture,
          apiToken,
          setProfilePicture
        );
      }
    }
  }, [request]);

  const num = ((Math.random() * 60) % 6).toFixed(0);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 30,
        flex: 1,
        backgroundColor: themeStyle.background,
      }}
    >
      {id ? (
        <>
          {profile ? (
            <>
              <View style={{ position: "absolute", top: 0 }}>
                <BackButtonComponent
                  navigation={navigation}
                  top={Platform.OS == "ios" ? 30 : 0}
                />
              </View>
              <Image
                source={
                  profilePicture
                    ? {
                        uri: profilePicture,
                      }
                    : require("../assets/images/logos/Couleur/LogoNoNomNoFond.png")
                }
                style={{
                  width: 0.45 * width,
                  height: 0.45 * width,
                  borderRadius: profilePicture && width,
                  resizeMode: profilePicture ? "cover" : "contain",
                  alignSelf: "center",
                }}
              />
              <Text
                numberOfLines={1}
                style={[styles.pageTitle, { color: themeStyle.text }]}
              >
                {profile.first_name} {profile.last_name}
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
                <Text
                  style={[styles.pageSubTitle, { color: themeStyle.textless }]}
                >
                  {langage.publicDesription}
                </Text>
                <Text
                  style={[styles.description, { color: themeStyle.textless }]}
                >
                  {profile.description}
                </Text>
                <Text
                  style={[styles.pageSubTitle, { color: themeStyle.textless }]}
                >
                  {langage.publicNetwork}
                </Text>
                {profile?.socials?.map((social) => (
                  <Item
                    social={social}
                    network={social.name}
                    contact={social.url}
                    key={social.id}
                  />
                ))}
                {profile?.phone_number && (
                  <Item network={"phone"} contact={profile?.phone_number} />
                )}

                <Item network={"email"} contact={profile?.email} />
              </ScrollView>
            </>
          ) : (
            <Text
              style={{
                color: themeStyle.textless,
                fontFamily: "Neon",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Chargement...
            </Text>
          )}
        </>
      ) : (
        <Text
          style={{
            color: themeStyle.textless,
            fontFamily: "Neon",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Aucun profil spécifié{"\n"} No specified profile {"\n"} How did you
          get here ?
        </Text>
      )}
    </View>
  );
}

function Item({ contact, network, ...props }) {
  console.log(props?.social, network);
  const [icon, setIcon] = useState();
  useEffect(() => {
    switch (network) {
      case "Instagram":
        setIcon(instagram);
        break;
      case "TikTok":
        setIcon(tiktok);
        break;
      case "Snap":
        setIcon(snapchat);
        break;
      case "Facebook":
        setIcon(facebook);
        break;
      case "phone":
        setIcon(phone);
        break;
      case "email":
        setIcon(email);
        break;
      case "Twitter":
        setIcon(twitter);
        break;
      default:
        break;
    }
  }, []);

  function openSocialLink() {
    switch (network) {
      case "Instagram":
        Linking.openURL("https://www.instagram.com/" + contact);
        break;
      case "Tiktok":
        Linking.openURL("https://www.tiktok.com/@" + contact);
        break;
      case "Twitter":
        Linking.openURL("https://twitter.com/@" + contact);
        break;
      case "Snapchat":
        Linking.openURL("https://www.snapchat.com/add/" + contact);
        break;
      case "Facebook":
        Linking.openURL("https://www.instagram.com/" + contact);
        break;
      default:
        Clipboard.setString(contact);

        break;
    }
  }
  if (contact) {
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
  return <></>;
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
