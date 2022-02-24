import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ColoredViewComponent({ isBlue, ...props }) {
  if (isBlue === true) {
    return (
      <View style={[styles.container, props?.containerStyle]}>
        <LinearGradient
          colors={["#0C1316", "#203C42", "#2293D0"]}
          end={{ x: 1, y: 0 }}
          locations={[0.0, 0.25, 0.75]}
          start={{ x: -0.3, y: 0 }}
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
          colors={["#E65F02", "#F4C182", "#FFF0C1"]}
          locations={[0.3, 0.7, 0.98]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1, y: 0 }}
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
