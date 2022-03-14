import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Chat, MessageType, defaultTheme } from "@flyerhq/react-native-chat-ui";
import logoBlanc from "../assets/images/logos/Couleur/LogoNoNom.png";
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

function ChatView(props) {
  const user = {
    id: "06c33e8b-e835-4736-80f4-63f44b66666c",
  };
  const user2 = {
    id: "06c33e8b-e835-4736-80f4-63f44b66766c",
    firstName: "Gravity",
    lastName: "Team",
    imageUrl: Image.resolveAssetSource(logoBlanc).uri,
    // imageUrl: "src/assets/images/logos/Blanc/LogoNoNomNoFond.png",
    // imageUrl:
    //   "https://images.bfmtv.com/nFJ4-Adp5X2cEzAXh6sLIkgkz2M=/1x1:1489x838/1600x0/images/-187010.jpg",
  };
  const [messages, setMessages] = useState([
    {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: "HI",
      type: "text",
    },
    {
      author: user2,
      createdAt: Date.now(),
      id: uuidv4(),
      text: "HEY YOU",
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
    <SafeAreaProvider>
      <Image
        source={logoBlanc}
        style={{
          width: 250,
          height: 250,
          // position: "absolute",
          top: 0,
          bottom: 0,
          alignSelf: "center",
          zIndex: 2,
        }}
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default ChatView;
