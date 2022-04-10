import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import { useAuthentification } from "../../Context/AuthContext";
import useFetch from "../../data/useFetch";
import SpecialEventComponent from "../../components/SpecialEventComponent";
import EventComponent from "../../components/EventComponent";
import { useTranslation } from "../../Context/TranslationContext";
import { useTheme } from "../../Context/theme/ThemeContext";

function NewEventList(props) {
  const [challengesNormal, setChallangesNormal] = useState([]);
  const [challengesSpecial, setChallangesSpecial] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const { apiToken } = useAuthentification();
  const { langage } = useTranslation();
  const { themeStyle } = useTheme();
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
      setRefreshing(false);
    }
  }, [normalRequest]);
  useEffect(() => {
    if (specialRequest?.status === "Done") {
      setChallangesSpecial(specialRequest.content);
    }
  }, [specialRequest]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={updateData} />
      }
    >
      {challengesSpecial?.length > 0 &&
        challengesSpecial?.map((event) => (
          <SpecialEventComponent
            navigation={props.navigation}
            event={event}
            key={(Math.random() * 1000).toFixed()}
          />
        ))}
      {challengesNormal?.length > 0 &&
        challengesNormal?.map((event) => (
          <EventComponent
            navigation={props.navigation}
            event={event}
            key={(Math.random() * 1000).toFixed()}
          />
        ))}

      {challengesNormal?.length === 0 && challengesSpecial?.length === 0 ? (
        <Text
          style={{
            alignSelf: "center",
            color: themeStyle.textless,
            marginTop: 20,
            fontFamily: "Neon",
            fontSize: 20,
          }}
        >
          {langage.noChallenge}
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default NewEventList;
