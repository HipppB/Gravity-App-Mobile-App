import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useAuthentification } from "../../Context/AuthContext";
import { useTranslation } from "../../Context/TranslationContext";
import { useTheme } from "../../Context/theme/ThemeContext";

import useFetch from "../../data/useFetch";
import SpecialEventComponent from "../../components/SpecialEventComponent";
import EventComponent from "../../components/EventComponent";
function SentEventList(props) {
  const { langage } = useTranslation();
  const { themeStyle } = useTheme();

  const [challengesNormal, setChallangesNormal] = useState([]);
  const [challengesSpecial, setChallangesSpecial] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const { apiToken } = useAuthentification();

  const [normalRequest, newNormalRequest] = useFetch();
  const [specialRequest, newSpecialRequest] = useFetch();

  function updateData() {
    newNormalRequest("challenge/new/normals", "GET", {}, apiToken);
    newSpecialRequest("challenge/new/specials", "GET", {}, apiToken);
  }
  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    if (normalRequest?.status === "Done") {
      setChallangesNormal(normalRequest.content);
    }
  }, [normalRequest]);
  useEffect(() => {
    if (specialRequest?.status === "Done") {
      setChallangesSpecial(specialRequest.content);
    }
  }, [specialRequest]);

  return (
    <ScrollView>
      <Text
        style={{
          fontFamily: "ChangaOne_400Regular_Italic",
          fontSize: 19,
          textAlign: "center",
          alignSelf: "center",
          marginTop: 20,
          color: themeStyle.textless,
        }}
      >
        {langage.refuse}
      </Text>

      <View style={{ opacity: 0.7 }}>
        <EventComponent
          navigation={props.navigation}
          wrong={
            "DEFIS REFUSÉ : La graviteam à jugé que le pont n'était pas assez haut pour valider le défis. Nous esperont tout de même que votre jambe vas mieux, n'hésitez pas à retenter le défis !"
          }
        />
      </View>
      <Text
        style={{
          fontFamily: "ChangaOne_400Regular_Italic",
          fontSize: 19,
          textAlign: "center",
          alignSelf: "center",
          marginTop: 20,
          color: themeStyle.textless,
        }}
      >
        {langage.waitingVal}
      </Text>

      <View style={{ opacity: 0.7 }}>
        <EventComponent navigation={props.navigation} validating />
        <SpecialEventComponent navigation={props.navigation} validating />
        <EventComponent navigation={props.navigation} validating />
      </View>
      <Text
        style={{
          fontFamily: "ChangaOne_400Regular_Italic",
          fontSize: 19,
          textAlign: "center",
          alignSelf: "center",
          marginTop: 20,
          color: themeStyle.textless,
        }}
      >
        {langage.validate}
      </Text>
      <View style={{ opacity: 0.7 }}>
        <EventComponent navigation={props.navigation} validate />
        <EventComponent navigation={props.navigation} validate />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default SentEventList;
