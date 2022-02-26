import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorViewComponent from "../components/ColoredViewComponent.js";
const { width, height } = Dimensions.get("screen");
function AccountView(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ColorViewComponent coloredViewStyle={styles.titleContainer}>
        <Text style={styles.titleText}>Mon compte</Text>
      </ColorViewComponent>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.text}>Bonjour Hippolyte,</Text>
          <Text style={styles.textSmall}>Une question ? Une demande ?</Text>
          <Text style={styles.textSmall}>N‘hesites pas à nous contacter !</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Chat")}>
          <ColorViewComponent coloredViewStyle={[styles.titleContainer]} isBlue>
            <Text style={styles.titleText}>Contacter Gravity</Text>
          </ColorViewComponent>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  titleContainer: {
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
  },
  text: {
    fontFamily: "Modern-Deco",
    textAlign: "center",
    fontSize: 30,
  },
  textSmall: {
    fontFamily: "Modern-Deco",
    textAlign: "center",
    lineHeight: 33,
    fontSize: 20,
  },
});

export default AccountView;
