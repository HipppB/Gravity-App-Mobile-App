import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawingBoard from "../../components/DrawingBoard";
const { width, height } = Dimensions.get("screen");
console.log(width, height);
function DrawWithHeads(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/logos/Couleur/Logo.png")}
        style={{
          maxWidth: width * 0.8,
          maxHeight: width * 0.8,
          resizeMode: "contain",
          position: "absolute",
          left: width / 2 - (width * 0.8) / 2,
          top: height / 2 - (width * 0.8) / 2,
        }}
      />
      <DrawingBoard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default DrawWithHeads;
