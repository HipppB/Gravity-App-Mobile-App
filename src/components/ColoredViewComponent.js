import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Animated,
  Dimensions,
  Appearance,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("screen");
const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  // Use dark color scheme
}
function ColoredViewComponent({
  isBlue,
  containerStyle,
  coloredViewStyle,
  ...props
}) {
  if (isBlue === true) {
    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <LinearGradient
          colors={["#0C1316", "#203C42", "#2293D0"]}
          end={{ x: 1, y: 0 }}
          locations={[0.0, 0.25, 0.75]}
          start={{ x: -0.3, y: 0 }}
          style={[styles.gradient, coloredViewStyle]}
        >
          {props.children}
        </LinearGradient>
      </Animated.View>
    );
  } else {
    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <LinearGradient
          colors={["#E65F02", "#F4C182", "#FFF0C1"]}
          locations={[0.3, 0.7, 0.98]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, coloredViewStyle]}
        >
          {props.children}
        </LinearGradient>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset:
      Platform.OS === "ios"
        ? {
            width: 0,
            height: 2,
          }
        : {},
    shadowOpacity: 0.25,
    shadowRadius: Platform.OS === "ios" ? 3.84 : 0,

    elevation: Platform.OS === "ios" ? 5 : 0,
  },
  gradient: {
    borderRadius: 15,
    padding: 5,
  },
});

export default ColoredViewComponent;
