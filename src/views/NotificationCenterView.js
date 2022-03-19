import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("screen");
import { useTranslation } from "../Context/TranslationContext";
import BackButtonComponent from "../components/BackButtonComponent";

function NotificationCenterView(props) {
  const { langage } = useTranslation();
  let listViewData = Array(20)
    .fill("")
    .map((_, i) => ({
      key: `${i}`,
      title: `Super notification #${i + 1}`,
      isNew: i < 3,
      action:
        Math.random() > 0.7
          ? "CALENDAR"
          : Math.random() > 0.7
          ? "URL"
          : Math.random() > 0.5
          ? "EVENT"
          : "SPONSOR",
    }));
  return (
    <View
      style={{
        paddingTop: 20,
        alignItems: "center",
        backgroundColor: "white",
        height: height - 60,
      }}
    >
      <SafeAreaView></SafeAreaView>
      <BackButtonComponent navigation={props.navigation} />

      <Image
        source={require("../assets/images/logos/Couleur/Logo.png")}
        style={{
          width: width * 0.4,
          height: width * 0.4,
          resizeMode: "contain",
        }}
      />
      <Text style={styles.pageTitle}>{langage.notification}</Text>
      <ScrollView
        style={{
          width: "100%",

          marginTop: 20,
          marginBottom: 10,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        {listViewData.map((notification, index) => (
          <Notification
            notification={notification}
            key={notification.key}
            navigation={props.navigation}
            index={index}
          />
        ))}
        {/* <Notification isNew /> */}
      </ScrollView>
    </View>
  );
}

function Notification({ notification, navigation, index }) {
  const [isNewVisible, setIsNewVisible] = useState(true);
  function callBack() {
    switch (notification.action) {
      case "CALENDAR":
        navigation.navigate("Calendar");
        break;
      case "EVENT":
        navigation.navigate("Event");
        break;
      case "SPONSOR":
        navigation.navigate("Sponsor");
        break;
      case "URL":
        Linking.openURL("https://google.com");
        break;

      default:
        break;
    }
  }
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: "5%",
        paddingTop: index === 0 ? 20 : 0,
      }}
    >
      <TouchableOpacity
        style={{ zIndex: 2 }}
        onPress={() => setIsNewVisible(!isNewVisible)}
      >
        {notification?.isNew && isNewVisible ? (
          <Image
            source={require("../assets/images/new.png")}
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: -20,
              left: -20,
            }}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#E8E8E8",
          width: "100%",
          minHeight: 70,
          marginBottom: 20,
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 20,
        }}
        onPress={() => callBack()}
      >
        <Text style={{ fontFamily: "ChangaOne_400Regular", marginBottom: 5 }}>
          {notification.title}
        </Text>
        <Text style={{ fontFamily: "Neon" }}>
          Action associée à la notif : {notification.action} {"\n"}
          Super description de cette super notification, l'utilisateur aura
          aussi possibilité de cliquer pour être redirigé sur : Un écran
          d'event, un écran de sponsor (Food ou Normal) ou un écran de jeu
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 30,
  },
});

export default NotificationCenterView;
