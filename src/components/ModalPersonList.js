import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  VirtualizedList,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import ColoredViewComponent from "./ColoredViewComponent";
const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: index === 499 ? "Tu es le meilleur testeur !" : `Amaury ${index + 1}`,
});

const getItemCount = (data) => 500;

const Item = ({ title, navigation, setVisible }) => {
  if (title === "Tu es le meilleur testeur !") {
    return (
      <Text style={styles.itemTitle}>
        {title} En vrai t'as eu du courage de descendre jusque là, en esperant
        que ça soit encore plus long pour descendre la liste des participants
        Gravity
      </Text>
    );
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setVisible(false);
        navigation.navigate("PublicProfil");
      }}
    >
      <Image
        source={require("../GravityHeadCrush/images/1.png")}
        style={styles.itemImage}
      />

      <Text numberOfLines={1} style={styles.itemTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

function ModalPersonList({ isVisible, setVisible, navigation }) {
  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe={true}
      //   scrollOffsetMax={400 - 300}
      //   onSwipeComplete={() => setVisible(false)}
      //   swipeDirection="left"
      customBackdrop={
        <Pressable
          onPress={() => setVisible(false)}
          style={{ flex: 1, width: "100%", backgroundColor: "white" }}
        />
      }
    >
      <View style={styles.modalContent}>
        <Text
          style={{
            fontFamily: "ChangaOne_400Regular",
            fontSize: 25,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Ils y seront !
        </Text>
        <VirtualizedList
          style={{
            maxHeight: "75%",
            marginBottom: 10,
            width: "80%",
          }}
          data={DATA}
          initialNumToRender={4}
          renderItem={({ item }) => (
            <Item
              key={item.id}
              title={item.title}
              navigation={navigation}
              setVisible={setVisible}
            />
          )}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
        <TouchableOpacity
          style={[styles.buttonTouchableContainer]}
          onPress={() => setVisible(false)}
        >
          <ColoredViewComponent
            coloredViewStyle={styles.buttonContainer}
            containerStyle={styles.buttonContainerContainer}
          >
            <Text style={styles.buttonText}>Fermer</Text>
          </ColoredViewComponent>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonTouchableContainer: {
    width: "80%",
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
  modalContent: {
    maxHeight: "80%",
    width: "90%",
    minHeight: "20%",
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    padding: 15,
    paddingVertical: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },
  item: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    backgroundColor: "gray",
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 40,
  },
  itemTitle: {
    fontFamily: "ChangaOne_400Regular_Italic",
    fontSize: 20,
    paddingLeft: 10,
  },
});

export default ModalPersonList;
