import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ColorViewComponent from "../../components/ColoredViewComponent.js";
import { useTranslation } from "../../Context/TranslationContext";
import { useAuthentification } from "../../Context/AuthContext.js";
import useFetch from "../../data/useFetch.js";
const { width, height } = Dimensions.get("screen");
function ProjetPedaView(props) {
  const { toggleLangage, langage, selectedLangage } = useTranslation();
  const { isFirstLogin, setIsFirstLogin, apiToken } = useAuthentification();
  const [link, setLink] = useState();
  const [request, newRequest] = useFetch();
  useEffect(() => {
    if (selectedLangage === "fr") {
      newRequest("presentation/5", "GET", {}, apiToken);
    } else {
      newRequest("presentation/6", "GET", {}, apiToken);
    }
  }, []);
  useEffect(() => {
    if (request?.status === "Done") {
      setLink(request?.content.content);
    }
  }, [request]);
  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity onPress={() => Linking.openURL(link)} disabled={!link}>
        <ColorViewComponent coloredViewStyle={[styles.titleContainer]}>
          <Text style={styles.titleText}>{langage.openInNav}</Text>
        </ColorViewComponent>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  titleContainer: {
    minWidth: width * 0.5,
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
  bodyContainer: {
    marginTop: 10,

    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "Neon",
    textAlign: "center",
    fontSize: 30,
  },
  textSmall: {
    fontFamily: "Neon",
    textAlign: "center",
    lineHeight: 33,
    fontSize: 20,
  },
});

export default ProjetPedaView;
