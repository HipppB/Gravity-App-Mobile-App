import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  Keyboard,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, MessageType, defaultTheme } from "@flyerhq/react-native-chat-ui";
import logoBlanc from "../assets/images/logos/Couleur/LogoNoNom.png";
import BackButtonComponent from "../components/BackButtonComponent";
const { width, height } = Dimensions.get("screen");
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

function ChatView(props) {
  // Logo Animation Handler
  const size = useRef(new Animated.Value(width * 0.3)).current;
  const left = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  console.log(size);
  function onKeyBoardOpen() {}
  function onKeyBoardClose() {}

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        console.log("Hey");
        Animated.timing(size, {
          toValue: width * 0.15,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(left, {
          toValue: (-width * 0.7) / 2,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(size, {
          toValue: width * 0.3,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(left, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const user = {
    id: "06c33e8b-e835-4736-80f4-63f44b66666c",
  };
  const user2 = {
    id: "06c33e8b-e835-4736-80f4-63f44b66766c",
    firstName: "Graviteam",
    imageUrl: Image.resolveAssetSource(logoBlanc).uri,
  };
  const [messages, setMessages] = useState([
    {
      author: user2,
      createdAt: new Date(1647226800000),
      id: uuidv4(),
      text: "Tkt, n'hésites pas à continuer cette fausse conversation pour tester l'application !",
      type: "text",
    },
    {
      author: user,
      createdAt: new Date(1647226800000),
      id: uuidv4(),
      text: "Wow ça marche ! Génial merci !",
      type: "text",
    },
    {
      author: user2,
      createdAt: new Date(1647226800000),
      id: uuidv4(),
      text: "Tu tape ton texte puis tu clique sur l'icone !",
      type: "text",
    },
    {
      author: user,
      createdAt: new Date(1647226800000),
      id: uuidv4(),
      text: "Hey comment j'envois un message ?",
      type: "text",
    },
  ]);

  const addMessage = (message) => {
    setMessages([message, ...messages]);
  };

  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    addMessage(textMessage);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="#0C1316"
        hideTransitionAnimation="true"
        animated={false}
      />

      <Animated.Image
        source={logoBlanc}
        style={{
          width: size,
          height: size,
          // position: "absolute",
          top: 0,
          left: left,
          bottom: 0,
          alignSelf: "center",
          zIndex: 1,
          opacity: opacity,
        }}
      />
      <BackButtonComponent
        navigation={props.navigation}
        top={Platform.OS == "ios" ? 60 : 0}
        color={"white"}
      />
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Chat
          showUserNames
          showUserAvatars
          messages={messages}
          onSendPress={handleSendPress}
          user={user}
          theme={{
            ...defaultTheme,
            colors: {
              ...defaultTheme.colors,
              primary: "#2293D0",
              secondary: "#ED8A33",
              background: "#0C1316",
              inputBackground: "#172D35",
              userAvatarNameColors: ["#FFFFFF"],
            },
            fonts: {
              ...defaultTheme.fonts,
              userNameTextStyle: {
                fontWeight: "600",
              },
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default ChatView;
