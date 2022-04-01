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
  Button,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, MessageType, defaultTheme } from "@flyerhq/react-native-chat-ui";
import logoBlanc from "../assets/images/logos/Couleur/LogoNoNom.png";
import BackButtonComponent from "../components/BackButtonComponent";
import io from "socket.io-client";
import { useAuthentification } from "../Context/AuthContext";

let socket;
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

function ChatView(props) {
  const { apiToken } = useAuthentification();
  const { width, height } = Dimensions.get("screen");

  const API = "https://api.liste-gravity.fr";

  // Logo Animation Handler
  const size = useRef(new Animated.Value(width * 0.3)).current;
  const left = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
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
    id: "06c33e8b-e835-4736-80f4-63f44d77766c",
  };
  const user2 = {
    id: "06c33e8b-e835-4736-80f4-63f44b66766c",
    firstName: "Graviteam",
    imageUrl: Image.resolveAssetSource(logoBlanc).uri,
  };

  //GESTION SOCKET
  useEffect(() => {
    initiateSocket();
    return () => disconnectSocket();
  }, []);

  const initiateSocket = () => {
    socket = io(API, {
      extraHeaders: {
        Authorization: apiToken,
      },
    });

    if (socket) {
      subscribeToChat(callbackReceiveing);
    }
  };
  const subscribeToChat = (cb) => {
    if (!socket) return true;
    console.log("SUBSCRIBING");
    socket.on("chat", (msg) => {
      console.log(messages);
      return cb(msg);
    });
  };

  const disconnectSocket = () => {
    console.log("Disconnecting socket...");
    if (socket) socket.disconnect();
  };

  //GESTIONS MESSAGES
  const [messages, setMessages] = useState([]);
  const [lastMesssage, setLastMessage] = useState();
  function addMessage(message) {
    setMessages([message, ...messages]);
  }

  function callbackReceiveing(message) {
    const textMessage = {
      author: user2,
      createdAt: Date.now(),
      id: (Math.random() * 10000).toFixed(0),
      text: message + " " + (Math.random() * 1000).toFixed(0),
      type: "text",
    };

    setLastMessage(textMessage);
    // let newMessages = messages;
    // newMessages = [textMessage, ...newMessages];
    // setMessages(newMessages);
  }
  useEffect(() => {
    if (lastMesssage) {
      setMessages([lastMesssage, ...messages]);
      setLastMessage();
    }
  }, [lastMesssage]);

  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    console.log("sending", message);
    socket.emit("chat", message);
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
