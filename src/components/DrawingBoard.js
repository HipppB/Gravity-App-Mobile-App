import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Dimensions,
  Animated,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import ColoredViewComponent from "./ColoredViewComponent";
const { width, height } = Dimensions.get("window");

import firstHead from "../GravityHeadCrush/images/1.png";
import secondHead from "../GravityHeadCrush/images/2.png";
import thirdHead from "../GravityHeadCrush/images/3.png";
import fourthHead from "../GravityHeadCrush/images/4.png";
import fithHead from "../GravityHeadCrush/images/5.png";
import sixthHead from "../GravityHeadCrush/images/6.png";
import seventhHead from "../GravityHeadCrush/images/7.png";
import eighthHead from "../GravityHeadCrush/images/8.png";
import nineththHead from "../GravityHeadCrush/images/9.png";

function DrawingBoard(props) {
  let headsList = new Array(...Array(10).keys());

  return (
    <View style={{ flexGrow: 2, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={firstHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={secondHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={thirdHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={fourthHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={fithHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={sixthHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={eighthHead} />;
          })}
        </View>
        <View style={{ width: 60, height: 60 }}>
          {headsList.map((head, index) => {
            return <Head key={index} head={nineththHead} />;
          })}
        </View>
      </View>
    </View>
  );
}

function Head({ head, ...props }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.Image
      source={head}
      style={[
        styles.tileContent,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
      {...panResponder.panHandlers}
    />
  );
}
const styles = StyleSheet.create({
  tileContent: {
    position: "absolute",
    zIndex: 3,
    width: 60,
    height: 60,
  },
  buttonTouchableContainer: {
    marginTop: 10,
    width: "70%",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainerContainer: {},
  buttonContainer: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginBottom: Platform.OS === "android" ? 100 : 0,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 20,
  },
});

export default DrawingBoard;
