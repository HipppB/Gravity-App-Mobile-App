import React, { useState, useRef, useEffect } from "react";
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
import getImage from "../components/data/getImage";
import { useAuthentification } from "../Context/AuthContext";
import { useTranslation } from "../Context/TranslationContext";

const Item = ({ participant, title, navigation, setVisible }) => {
  const { apiToken } = useAuthentification();

  const [image, setImage] = useState();

  useEffect(() => {
    if (participant?.profile_picture) {
      getImage(participant.profile_picture, apiToken, setImage);
    } else if (participant?.first_name || participant?.last_name) {
      setImage(
        "https://ui-avatars.com/api/?name=" +
          participant?.first_name +
          "+" +
          participant?.last_name
      );
    }
  }, [participant]);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setVisible(false);
        navigation.navigate("PublicProfil", { id: participant.id });
      }}
    >
      <Image source={{ uri: image }} style={styles.itemImage} />

      <Text numberOfLines={1} style={styles.itemTitle}>
        {participant.first_name}
      </Text>
    </TouchableOpacity>
  );
};

function ModalPersonList({ isVisible, setVisible, navigation, participants }) {
  const { langage, selectedLangage } = useTranslation();
  const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title:
      index === 499 ? "Tu es le meilleur testeur !" : `Amaury ${index + 1}`,
  });
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
      {participants.length > 0 && (
        <View style={styles.modalContent}>
          <Text
            style={{
              fontFamily: "ChangaOne_400Regular",
              fontSize: 25,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {langage.presentPersons}
          </Text>
          <VirtualizedList
            style={{
              maxHeight: "75%",
              marginBottom: 10,
              width: "80%",
            }}
            data={participants}
            initialNumToRender={4}
            renderItem={(participant) => (
              <Item
                participant={participant.item}
                key={participant.id}
                navigation={navigation}
                setVisible={setVisible}
              />
            )}
            keyExtractor={(participant) => participant.id}
            getItemCount={() => participants.length}
            getItem={(participant, index) => participant[index]}
          />
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => setVisible(false)}
          >
            <ColoredViewComponent
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage.close}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        </View>
      )}
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
