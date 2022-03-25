import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Dimensions,
  Animated,
  Image,
  Text,
  Button,
} from "react-native";

const { width, height } = Dimensions.get("window");

import firstHead from "../GravityHeadCrush/images/1.png";
import secondHead from "../GravityHeadCrush/images/2.png";
import thirdHead from "../GravityHeadCrush/images/3.png";
import fourthHead from "../GravityHeadCrush/images/4.png";
import fithHead from "../GravityHeadCrush/images/5.png";
import sixthHead from "../GravityHeadCrush/images/6.png";
import seventhHead from "../GravityHeadCrush/images/7.png";

function GravityCrush(props) {
  const headsTypes = [
    firstHead,
    secondHead,
    thirdHead,
    fourthHead,
    fithHead,
    sixthHead,
    seventhHead,
  ];

  const keys = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  let keysNew = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
  ];
  const [tileDataSource, setTileDataSource] = useState(initilizeData());
  const [numOfSwipe, setNumOfSwipe] = useState(0);
  let swipeNumber = 0;
  useEffect(() => {
    animateValuesToLocations();
  }, []);

  function animateValuesToLocations() {
    tileDataSource.forEach((row, i) => {
      row.forEach((elem, j) => {
        Animated.timing(elem.location, {
          toValue: { x: 70 * i, y: 70 * j },
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    });
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function tileData(key, int) {
    return {
      key: key,
      markedAsMatch: false,
      location: new Animated.ValueXY(),
      imgObj: headsTypes[int],
    };
  }
  function initilizeData() {
    var tileDatas = keysNew.map((row, i) => {
      let dataRows = row.map((key, j) => {
        let int = getRandomInt(7);
        let data = tileData(key, int);
        return data;
      });
      return dataRows;
    });

    return tileDatas;
  }
  function swap(i, j, i2, j2) {
    const swapStarter = tileDataSource[i][j];
    const swapEnder = tileDataSource[i2][j2];

    tileDataSource[i][j] = swapEnder;
    tileDataSource[i2][j2] = swapStarter;

    const animateSwap = Animated.parallel([
      Animated.timing(swapStarter.location, {
        toValue: { x: 70 * i2, y: 70 * j2 },
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(swapEnder.location, {
        toValue: { x: 70 * i, y: 70 * j },
        duration: 250,
        useNativeDriver: true,
      }),
    ]);
    animateSwap.start(() => {
      let allMatches = getAllMatches(tileDataSource);
      if (allMatches.length != 0) {
        console.log("IT'S A MATCH");
        console.log(allMatches);
        // processMatches(allMatches);
      }
    });
    // animateSwap.start(() => {
    //   let allMatches = getAllMatches(tileDataSource);
    //   if (allMatches.length != 0) {
    //     this.processMatches(allMatches);
    //   }
    // });
  }
  function getAllMatches(tileData) {
    let rowMatches = checkRowsForMatch(tileData);
    let colMatches = checkColsForMatch(tileData);
    return [...rowMatches, ...colMatches];
  }

  let pan = React.useRef().current;
  let startx;
  let starty;
  let endx;
  let endy;
  let left = (width - 350) / 2;
  let top = (height - 350) / 2;
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder to the ref
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        //Quand l'utilisateur clique on repere la case où le mouvement à commencé
        startx = Math.floor((gestureState.x0 - left) / 70);
        starty = Math.floor((gestureState.y0 - top) / 70);
        console.log("hey");
      }, //No visual feedBack of movement started
      // Component is beiing moved, we update it in real time by changing it's current native props
      onPanResponderMove: (evt, gestureState) => {
        let elem = tileDataSource[startx][starty];

        if (elem?.location) {
          Animated.timing(elem.location, {
            toValue: {
              x: startx * 70 + gestureState.dx,
              y: starty * 70 + gestureState.dy,
            },
            duration: 0,
            useNativeDriver: true,
          }).start();
        }
        //Ici gérer l'animation (faire suivre la tête)

        // const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } =
        //   swipeDirections;

        // let initialGestureX = gestureState.x0;
        // let initialGestureY = gestureState.y0;

        // switch (gestureName) {
        //   case SWIPE_UP:
        //     this.swap(i, j, 0, -1);
        //     break;
        //   case SWIPE_DOWN:
        //     this.swap(i, j, 0, 1);
        //     break;
        //   case SWIPE_LEFT:
        //     this.swap(i, j, -1, 0);
        //     break;
        //   case SWIPE_RIGHT:
        //     this.swap(i, j, 1, 0);
        //     break;
        // }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // Component is not touch anymore, we update all data one last time
      onPanResponderRelease: (evt, gestureState) => {
        //Gestion du mouvement final (Calcul si le mouvement est valide + animation pour mettre les deux à la bonne place)
        //On repere la case où le mouvement à fini
        endx = Math.floor((gestureState.moveX - left) / 70);
        endy = Math.floor((gestureState.moveY - top) / 70);

        if (
          endx > -1 &&
          endx < 5 &&
          endy > -1 &&
          endy < 5 &&
          (startx !== endx || starty !== endy)
        ) {
          console.log(
            "HAS MOVED from (" +
              startx +
              " " +
              starty +
              ") to (" +
              endx +
              " " +
              endy +
              ")"
          );
          swipeNumber = swipeNumber + 1;
          console.log(numOfSwipe, swipeNumber);
          setNumOfSwipe(swipeNumber);
          swap(startx, starty, endx, endy);
        } else {
          const swapStarter = tileDataSource[startx][starty];

          Animated.timing(swapStarter.location, {
            toValue: { x: 70 * startx, y: 70 * starty },
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
      },
      // Another component has become the responder ? We terminate it, we save last data
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        return true;
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 200 }}>
        <Text>{numOfSwipe}</Text>
      </View>
      <View style={styles.board} ref={pan} {...panResponder.panHandlers}>
        {keys.map((key) => (
          <BoardCase key={key} num={key} />
        ))}

        {renderTiles(tileDataSource)}
      </View>
    </View>
  );
}

function renderTiles(tileData) {
  let tiles = [];
  tileData.forEach((row, i) => {
    let rows = row.forEach((e, j) => {
      //       // e is a singular TileData class.

      tiles.push(<Tile location={e.location} key={e.key} img={e.imgObj} />);
    });
  });
  return tiles;
}

function BoardCase(props) {
  return <View style={styles.tile}>{/* <Text>{props.num}</Text> */}</View>;
}

function Tile(props) {
  return (
    <Animated.Image
      source={props.img}
      style={[
        styles.tileContent,
        {
          transform: [
            { translateX: props.location.x },
            { translateY: props.location.y },
          ],
        },
      ]}
    />
  );
}

const isMatch = (objOne, objTwo) => {
  if (objOne != null && objTwo != null) {
    if (objOne.image == objTwo.image) {
      return true;
    }
  } else {
    return false;
  }
};

// Iterates through each row to look for a match.
const checkRowsForMatch = (tileData) => {
  return [];
};

// Iterates through each row to look for a match.
const checkColsForMatch = (tileData) => {
  return [];
};

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
  tileContent: {
    position: "absolute",
    zIndex: 2,
    width: 60,
    height: 60,
    left: 5,
    top: 5,
  },
});

export default GravityCrush;
