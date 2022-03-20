import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButtonComponent from "../components/BackButtonComponent";
import ColoredViewComponent from "../components/ColoredViewComponent";
import { useTranslation } from "../Context/TranslationContext";
import Modal from "react-native-modal";

const heads = [
  require("../GravityHeadCrush/images/1.png"),
  require("../GravityHeadCrush/images/2.png"),
  require("../GravityHeadCrush/images/3.png"),
  require("../GravityHeadCrush/images/4.png"),
  require("../GravityHeadCrush/images/5.png"),
  require("../GravityHeadCrush/images/6.png"),
  require("../GravityHeadCrush/images/8.png"),
  require("../GravityHeadCrush/images/9.png"),
];
const { width, height } = Dimensions.get("window");

function FirstConnexionPopUp({ isModalVisible, setModalVisible, navigation }) {
  const { langage } = useTranslation();
  const num = ((Math.random() * 60) % 6).toFixed(0);

  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
      customBackdrop={
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{ flex: 1, width: "100%", backgroundColor: "white" }}
        ></Pressable>
      }
    >
      <View
        style={{
          width: "100%",
          minHeight: "20%",
          backgroundColor: "white",
          borderRadius: 20,
          alignSelf: "center",
          alignItems: "center",
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 15,
        }}
      >
        <Image
          source={require("../assets/images/logos/Couleur/Logo.png")}
          style={{
            width: width * 0.7,
            height: width * 0.7,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <ScrollView
          style={{
            width: "100%",
            height: "auto",
            paddingBottom: 0,
          }}
          contentContainerStyle={{ alignItems: "center", padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.text}>
            Hello [Prénom] ! {"\n"}Merci d’avoir téléchargé notre application !
            {"\n"}
            Aventure-toi [avec asso] dans notre galaxie avec [GravityApp] comme
            seul guide et Feel the Gravity toute la semaine ✨ {"\n"}
            {"\n"} La Graviteam 💙🧡
          </Text>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("EditAccount");
            }}
          >
            <ColoredViewComponent
              isBlue
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage?.myAccount}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonTouchableContainer]}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <ColoredViewComponent
              isBlue
              coloredViewStyle={styles.buttonContainer}
              containerStyle={styles.buttonContainerContainer}
            >
              <Text style={styles.buttonText}>{langage?.close}</Text>
            </ColoredViewComponent>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    lineHeight: 25,
    fontFamily: "Neon",
  },
  buttonTouchableContainer: {
    alignSelf: "center",
    marginBottom: 40,
    flexGrow: 1,
    maxWidth: "48%",
  },

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
    fontSize: 18,
  },
});

export default FirstConnexionPopUp;
