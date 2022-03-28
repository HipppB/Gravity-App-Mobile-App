import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ColorViewComponent from "../../components/ColoredViewComponent.js";
import { useTranslation } from "../../Context/TranslationContext";
import { useAuthentification } from "../../Context/AuthContext.js";
import useFetch from "../../data/useFetch.js";
const { width, height } = Dimensions.get("screen");
function FilmView(props) {
  const { langage } = useTranslation();
  const { apiToken } = useAuthentification();
  const [link, setLink] = useState();
  const [request, newRequest] = useFetch();
  useEffect(() => {
    newRequest("presentation/8", "GET", {}, apiToken);
  }, []);
  useEffect(() => {
    if (request?.status === "Done") {
      setLink(request?.content.content);
    }
  }, [request]);
  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity onPress={() => Linking.openURL(link)}>
        <ColorViewComponent coloredViewStyle={[styles.titleContainer]}>
          <Text style={styles.titleText}>{langage.openOnYoutube}</Text>
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
    width: width * 0.5,
    alignItems: "center",
    height: 50,
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

export default FilmView;
