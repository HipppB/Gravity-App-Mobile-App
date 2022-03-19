import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

function BackButtonComponent(props) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: props.top || 20,
        left: 20,
        zIndex: 10,
      }}
      onPress={() => props.navigation.goBack()}
    >
      <Image
        source={require("../assets/images/left-arrow.png")}
        style={{
          width: 20,
          height: 20,
          tintColor: props?.color,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default BackButtonComponent;
