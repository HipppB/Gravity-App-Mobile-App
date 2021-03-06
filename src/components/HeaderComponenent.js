import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../Context/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthentification } from "../Context/AuthContext";
import { useTheme } from "../Context/theme/ThemeContext";

function HeaderComponenent(props) {
  const { langage } = useTranslation();
  const { userInfos, apiToken } = useAuthentification();
  useEffect(() => console.info(userInfos.profile_picture), [userInfos]);

  const { themeStyle } = useTheme();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            props.navigation.navigate("Home", { screen: "HomeAccount" })
          }
        >
          {userInfos?.profile_picture ? (
            <Image
              source={{
                uri:
                  "https://api.liste-gravity.fr/static/image/" +
                  userInfos?.profile_picture,
                headers: { Authorization: "Bearer " + apiToken },
              }}
              style={[
                styles.profileContainer,
                // { borderWidth: 0, width: 40, height: 40 },
              ]}
            />
          ) : (
            <LinearGradient
              colors={["#0C1316", "#2293D0"]}
              end={{ x: 1, y: 0 }}
              start={{ x: -0.1, y: 0 }}
              style={[styles.profileContainer]}
            >
              <View style={styles.profileSubContainer}></View>
            </LinearGradient>
          )}

          <View style={styles.textContainer}>
            <Text style={[styles.welcomeText, { color: themeStyle.textless }]}>
              {langage.bienvenueText}
            </Text>
            <Text style={[styles.nameText, { color: themeStyle.text }]}>
              {userInfos?.first_name || langage.stranger}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Notifications")}
        >
          <Image
            source={require("../assets/images/annonce.png")}
            style={styles.icon}
          />
          <View style={styles.notification} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: themeStyle.text }]}>
          {props?.title || "Feel the GRAVITY"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    marginTop: 0,
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,

    marginRight: 10,
  },
  profileSubContainer: {
    width: 35,
    height: 35,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  welcomeText: {
    fontFamily: "Neon",
  },
  nameText: {
    fontFamily: "Neon",
    fontSize: 20,
  },
  titleContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontFamily: "ChangaOne_400Regular_Italic",
    fontSize: 32,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 50,
  },
  notification: {
    position: "absolute",
    width: 10,
    height: 10,

    bottom: 0,
    left: 30,
    borderRadius: 30,
  },
});

export default HeaderComponenent;
