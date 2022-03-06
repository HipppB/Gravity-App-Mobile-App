import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");
import { useTranslation } from "../Context/TranslationContext";

function NotificationCenterView(props) {
  const { toggleLangage, langage } = useTranslation();

  let listViewData = Array(20)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));
  return (
    <View
      style={{
        paddingTop: 20,
        alignItems: "center",
        backgroundColor: "white",
        height: height - 60,
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          left: 20,
        }}
        onPress={() => props.navigation.goBack()}
      >
        <Image
          source={require("../assets/images/left-arrow.png")}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
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

          paddingHorizontal: "5%",
          marginTop: 20,
          marginBottom: 10,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        <Notification isNew />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </ScrollView>
    </View>
  );
}

function Notification(props) {
  const [isNewVisible, setIsNewVisible] = useState(true);
  return (
    <View>
      <TouchableOpacity
        style={{ zIndex: 2 }}
        onPress={() => setIsNewVisible(!isNewVisible)}
      >
        {props?.isNew && isNewVisible ? (
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
      >
        <Text style={{ fontFamily: "ChangaOne_400Regular", marginBottom: 5 }}>
          Super titre de notification
        </Text>
        <Text style={{ fontFamily: "Neon" }}>
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
