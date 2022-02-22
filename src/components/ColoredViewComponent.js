import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ColoredViewComponent({ isBlue, ...props }) {
  if (isBlue === true) {
    return (
      <View style={[styles.container, props?.containerStyle]}>
        <LinearGradient
          colors={["#203D43", "#4191CC"]}
          end={{ x: 1, y: 0.5 }}
          style={[styles.gradient, props?.coloredViewStyle]}
        >
          {props.children}
        </LinearGradient>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, props?.containerStyle]}>
        <LinearGradient
          colors={["#E86D32", "white"]}
          end={{ x: 1.2, y: 0.5 }}
          style={[styles.gradient, props?.coloredViewStyle]}
        >
          {props.children}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gradient: {
    borderRadius: 15,
    padding: 5,
  },
});

export default ColoredViewComponent;
