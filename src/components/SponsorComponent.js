import React, { useState, useRef } from "react";
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
import { ScrollView } from "react-native-gesture-handler";

function SponsorComponent(props) {
  const [isOpen, setisOpen] = useState(false);
  const containerHeight = useRef(new Animated.Value(0)).current;
  const opacityContent = useRef(new Animated.Value(0)).current;

  const [contentHeight, setContentHeight] = useState(0);
  function open() {
    console.log("hey");
    Animated.parallel([
      Animated.timing(containerHeight, {
        toValue: 1, // return to start
        useNativeDriver: false,
        duration: 300,
      }),
      Animated.timing(containerHeight, {
        toValue: 1, // return to start
        useNativeDriver: false,
        duration: 200,
      }),
    ]).start();
  }
  function close() {
    console.log("ho");

    Animated.parallel([
      Animated.timing(containerHeight, {
        toValue: 0, // return to start
        useNativeDriver: false,
        duration: 300,
      }),
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

  return (
    <Pressable onPress={() => toggleOpen()}>
      <Animated.View
        style={[
          styles.container,
          {
            display: "flex",

            flex: 1,
            flexGrow: 1,
            height: containerHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [70, contentHeight + 100],
            }),

            minHeight: 70,
          },
        ]}
      >
        <View style={[styles.containerHeader]}>
          <Image
            source={require("../GravityHeadCrush/images/2.png")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular",
                fontSize: 19,

                lineHeight: 20,
              }}
            >
              Nom du sponsor
            </Text>
            <Text
              style={{
                fontFamily: "ChangaOne_400Regular_Italic",
                fontSize: 17,

                lineHeight: 20,
              }}
            >
              Sous titre du sponsor
            </Text>
          </View>
        </View>
        <View
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
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              console.log(height);

              setContentHeight(height);
            }}
            style={{
              paddingHorizontal: 10,

              fontFamily: "ChangaOne_400Regular_Italic",
              fontSize: 15,
              opacity: 0.7,
              lineHeight: 20,
            }}
          >
            CE SUPER SPONSOR TE FERA GAGNER PLEIN D'ARGENT ET A NOUS AUSSI,
            POURQUOI J'ECRIS EN MAJUSCULE ? CAR JE DOIS TESTER L'ANIMATION QUE
            JE VIENS DE PRENDRE 4 PUTAINS D'HEURES A FAIRE. SI ELLE MARCHE PAS
            NE ME LE DIS PAS MERCI{"\n"} (En vrai dit le moi car tout doit être
            parfait surtout quand ça concerne la moula)
          </Text>
        </View>
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
    backgroundColor: "black",
  },
  textContainer: {},
});

export default SponsorComponent;