import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import ColoredViewComponent from "./ColoredViewComponent";
import { LinearGradient } from "expo-linear-gradient";

function HeaderComponenent(props) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <LinearGradient
            colors={["#0C1316", "#2293D0"]}
            end={{ x: 1, y: 0 }}
            start={{ x: -0.1, y: 0 }}
            style={[styles.profileContainer]}
          >
            <View style={styles.profileSubContainer}></View>
          </LinearGradient>

          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Bienvenue,</Text>
            <Text style={styles.nameText}>Hippolyte</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Notifications")}
        >
          <Image
            source={require("../assets/images/annonce.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Feel the GRAVITY</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    marginTop: 20,
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
    fontFamily: "Modern-Deco",
  },
  nameText: {
    fontFamily: "Modern-Deco",
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
});

export default HeaderComponenent;
