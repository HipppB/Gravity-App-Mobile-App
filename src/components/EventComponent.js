import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Pressable,
  Button,
  Dimensions,
} from "react-native";

import ColoredViewComponent from "../components/ColoredViewComponent";
import { LinearGradient } from "expo-linear-gradient";
import getImage from "./data/getImage";
import { useAuthentification } from "../Context/AuthContext";

function EventComponent({ event, ...props }) {
  const [isOpen, setisOpen] = useState(false);
  const containerHeight = useRef(new Animated.Value(0)).current;

  const [eventImage, setEventImage] = useState();
  const { apiToken } = useAuthentification();
  useEffect(() => {
    if (event.imageUri) {
      getImage(event.imageUri, apiToken, setEventImage);
    }
  }, []);

  const [contentHeight, setContentHeight] = useState(0);

  function open() {
    Animated.parallel([
      Animated.timing(containerHeight, {
        toValue: 1, // return to start
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  }
  function close() {
    Animated.parallel([
      Animated.timing(containerHeight, {
        toValue: 0, // return to start
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  }
  function toggleOpen() {
    if (!isOpen) {
      setisOpen(true);
      open();
    } else {
      setisOpen(false);
      close();
    }
  }
  const colorgrad = props?.wrong
    ? ["#710000", "#710000", "#bc2222"]
    : ["#0C1316", "#203C42", "#2293D0"];

  if (props?.validate) {
    return (
      <Pressable onPress={() => props.navigation.navigate("LongEvent", event)}>
        <View
          style={{
            width: "80%",
            display: "flex",
            height: 75,
            marginTop: 20,
            alignSelf: "center",
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
          }}
        >
          <LinearGradient
            colors={["#007204", "#038a05", "#86d78b"]}
            end={{ x: 1, y: 0 }}
            locations={[0.0, 0.25, 0.75]}
            start={{ x: -0.3, y: 0 }}
            style={{ width: "100%", height: "100%", borderRadius: 15 }}
          >
            <View style={[styles.containerHeader]}>
              <Animated.Image
                source={
                  eventImage
                    ? { uri: eventImage }
                    : require("../assets/images/logos/Couleur/LogoNoNomNoFond.png")
                }
                style={[styles.image, !eventImage && { resizeMode: "center" }]}
              />
              <View style={styles.textContainer}>
                <Text
                  style={{
                    fontFamily: "ChangaOne_400Regular",
                    fontSize: 19,
                    color: "white",
                    lineHeight: 20,
                  }}
                >
                  {event?.translation[0]?.title}
                </Text>
                <Text
                  style={{
                    color: "white",

                    fontFamily: "ChangaOne_400Regular_Italic",
                    fontSize: 17,

                    lineHeight: 20,
                  }}
                >
                  Défis validé !
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => toggleOpen()}>
      <Animated.View
        style={{
          width: "80%",
          display: "flex",

          flex: 1,
          flexGrow: 1,
          height: containerHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [70, contentHeight + 100],
          }),
          marginTop: 20,
          alignSelf: "center",
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
        }}
      >
        <LinearGradient
          colors={colorgrad}
          end={{ x: 1, y: 0 }}
          locations={[0.0, 0.25, 0.75]}
          start={{ x: -0.3, y: 0 }}
          style={{ width: "100%", height: "100%", borderRadius: 15 }}
        >
          <View style={[styles.containerHeader]}>
            <Image
              source={
                eventImage
                  ? { uri: eventImage }
                  : require("../assets/images/logos/Couleur/LogoNoNomNoFond.png")
              }
              style={[styles.image, !eventImage && { resizeMode: "center" }]}
            />
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontFamily: "ChangaOne_400Regular",
                  fontSize: 19,
                  color: "white",
                  lineHeight: 20,
                }}
              >
                {event?.translation[0]?.title}
              </Text>
              <Text
                style={{
                  color: "white",

                  fontFamily: "ChangaOne_400Regular_Italic",
                  fontSize: 17,

                  lineHeight: 20,
                }}
              >
                {props?.wrong
                  ? "Défis refusé"
                  : event?.translation[0]?.subtitle}
              </Text>
            </View>
          </View>
          <View
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;

              setContentHeight(height);
            }}
            style={[
              {
                position: "absolute",
                top: 75,
                flexShrink: 1,
                opacity: isOpen ? 1 : 0,

                left: 0,
                right: 0,
              },
            ]}
          >
            <Text
              style={{
                paddingHorizontal: 10,

                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 15,
                opacity: 0.9,
                lineHeight: 20,
                color: "white",
              }}
            >
              {props?.wrong ? props.wrong : event?.translation[0]?.description}
            </Text>
            <TouchableOpacity
              style={[styles.buttonTouchableContainer]}
              onPress={() => props.navigation.navigate("LongEvent", event)}
            >
              <ColoredViewComponent
                coloredViewStyle={styles.buttonContainer}
                containerStyle={styles.buttonContainerContainer}
                isBlue
              >
                <Text style={styles.buttonText}>
                  {props?.wrong
                    ? "Retenter le défis"
                    : props?.validating
                    ? "Rajouter des éléments"
                    : "Participer au Défis"}
                </Text>
              </ColoredViewComponent>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,

    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 10,
  },
  textContainer: {},
  buttonTouchableContainer: {
    width: "70%",
    alignSelf: "center",
    marginTop: 15,
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: 0,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default EventComponent;
