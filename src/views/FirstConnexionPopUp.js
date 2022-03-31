import React, { useEffect, useState } from "react";
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
import { useAuthentification } from "../Context/AuthContext";
import { useTheme } from "../Context/theme/ThemeContext";
import useFetch from "../data/useFetch";

const { width, height } = Dimensions.get("window");

function FirstConnexionPopUp({ isModalVisible, setModalVisible, navigation }) {
  const [data, newRequest] = useFetch();

  const { userInfos, apiToken } = useAuthentification();
  const [requestText, newRequestText] = useFetch();
  const [text, setText] = useState("");

  console.log(userInfos);
  const { langage, selectedLangage } = useTranslation();
  const { themeStyle } = useTheme();
  useEffect(() => {
    if (selectedLangage === "fr") {
      newRequestText("presentation/1", "GET", {}, apiToken);
    } else {
      newRequestText("presentation/2", "GET", {}, apiToken);
    }

    if (userInfos.language != selectedLangage) {
      newRequest("user", "PUT", { language: selectedLangage }, apiToken);
    }
  }, []);

  useEffect(() => {
    if (requestText?.status === "Done") {
      const pieces = requestText.content.content.split("{name}");
      const result = pieces.join(userInfos?.first_name);
      const pieces2 = result.split("\\n");
      const result2 = pieces2.join("\n");
      setText(result2);
    }
  }, [requestText]);
  useEffect(() => {
    if (requestText?.status === "Done") {
      const pieces = requestText.content.content.split("{name}");
      const result = pieces.join(userInfos?.first_name);
      const pieces2 = result.split("\\n");
      const result2 = pieces2.join("\n");
      setText(result2);
    }
  }, [userInfos]);
  const num = ((Math.random() * 60) % 6).toFixed(0);

  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
      customBackdrop={
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: themeStyle.background,
          }}
        ></Pressable>
      }
    >
      <View
        style={{
          width: "100%",
          minHeight: "20%",
          backgroundColor: themeStyle.backless,
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
          <Text style={[styles.text, { color: themeStyle.textless }]}>
            {text}
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
