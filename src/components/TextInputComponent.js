import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

function TextInputComponent(props) {
  const [isSecured, setIsSecured] = useState(props?.isSecured);
  const [isSecurityOn, setIsSecurityOn] = useState(true);
  const topValue = useRef(new Animated.Value(12)).current;
  const fontSizeValue = useRef(new Animated.Value(20)).current;
  const fontOpacity = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    //In case a default value is given
    if (props?.value) {
      Animated.timing(topValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontSizeValue, {
        toValue: 13,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontOpacity, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, []);
  function inputFocus() {
    if (!props?.value) {
      Animated.timing(topValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontSizeValue, {
        toValue: 13,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontOpacity, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }
  function inputUnFocus() {
    if (!props?.value) {
      Animated.timing(topValue, {
        toValue: 12,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontSizeValue, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(fontOpacity, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }
  let securedStyle = {};

  return (
    <View
      style={[
        {
          position: "relative",
          justifyContent: "flex-end",
        },
        props?.additionalStyleContainer,
      ]}
    >
      <Animated.Text
        style={[
          styles.titleStyles,
          {
            top: topValue,
            fontSize: fontSizeValue,
            opacity: fontOpacity,
          },
        ]}
      >
        {props?.placeholder}
      </Animated.Text>

      <TextInput
        autoFocus={props?.autoFocus}
        onFocus={inputFocus}
        onBlur={inputUnFocus}
        style={[styles.inputStyle, props?.additionalStyle, securedStyle]}
        onChangeText={props?.onChange}
        value={props?.value}
        editable={props?.disabled}
        keyboardType={props?.keyboardType}
        secureTextEntry={props?.secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
    fontFamily: "ChangaOne_400Regular",
    color: "white",
    fontSize: 20,
    borderBottomColor: "gray",
  },
  titleStyles: {
    position: "absolute",
    fontSize: 20,

    width: "100%",
    textAlign: "center",
    fontFamily: "ChangaOne_400Regular",
    color: "white",
  },
  eyeContainer: {
    zIndex: 1,
    position: "absolute",
    alignSelf: "center",
    right: 5,
    top: 25 - 8,
  },
  eye: {
    tintColor: "#62C9C9",
    width: 25,
    height: 25,
  },
  eyeClose: {
    tintColor: "#62C9C9",

    position: "absolute",

    width: 25,
    height: 25,
  },
});

export default TextInputComponent;
