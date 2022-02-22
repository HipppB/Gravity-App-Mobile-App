import React, { useRef } from "react";
import reactDom from "react-dom";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
} from "react-native";

import firstHead from "../GravityHeadCrush/images/1.png";
import secondHead from "../GravityHeadCrush/images/2.png";
import thirdHead from "../GravityHeadCrush/images/3.png";
import fourthHead from "../GravityHeadCrush/images/4.png";
import fithHead from "../GravityHeadCrush/images/5.png";
import sixthHead from "../GravityHeadCrush/images/6.png";
import seventhHead from "../GravityHeadCrush/images/7.png";

function GravityHeadCrush(props) {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}

function Board(props) {
  const keys = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  return (
    <View style={styles.board}>
      {keys.map((key) => (
        <BoardCase key={key} num={key} />
      ))}
      {keys.map((key) => (
        <Tile key={key} num={key} />
      ))}
    </View>
  );
}

function BoardCase(props) {
  return <View style={styles.tile}>{/* <Text>{props.num}</Text> */}</View>;
}
function Tile(props) {
  const heads = [
    firstHead,
    secondHead,
    thirdHead,
    fourthHead,
    fithHead,
    sixthHead,
    seventhHead,
  ];
  const num = ((Math.random() * 60) % 6).toFixed(0);
  console.log(props.num);
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
    <Animated.View
      key={props.num}
      style={[
        {
          zIndex: 1,
          position: "absolute",
          left: Math.round((props.num - 1) % 5) * 70 + 5,
          top: Math.floor((props.num - 1) / 5) * 70 + 5,

          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Image source={heads[num]} style={styles.head} />
      {/* <Text style={{ color: "red", fontWeight: "bold", right: 15 }}>
        {props.num}
      </Text> */}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 350,
    height: 350,
  },
  tile: {
    width: 70,
    height: 70,
    borderWidth: 1,
  },
  head: {
    position: "absolute",
    zIndex: 2,
    width: 60,
    height: 60,
  },
});

export default GravityHeadCrush;
