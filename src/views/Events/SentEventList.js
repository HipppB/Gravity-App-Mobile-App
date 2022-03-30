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
  const [challengesAccepted, setChallengeAccepted] = useState([]);
  const [challengesProcessing, setChallengesProcessing] = useState([]);
  const [challengesRejected, setChallengeRejected] = useState([]);

  const { apiToken } = useAuthentification();

  const [aceeptedRequest, newAcceptedRequest] = useFetch();
  const [processingRequest, newProcessingRequest] = useFetch();
  const [rejectedgRequest, newRejectedRequest] = useFetch();

  function updateData() {
    newRejectedRequest("challenge/refused", "GET", {}, apiToken);
    newProcessingRequest("challenge/processing", "GET", {}, apiToken);
    newAcceptedRequest("challenge/validated", "GET", {}, apiToken);
  }
  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    if (rejectedgRequest?.status === "Done") {
      setChallengeRejected(rejectedgRequest.content);
    }
  }, [rejectedgRequest]);
  useEffect(() => {
    if (processingRequest?.status === "Done") {
      setChallengesProcessing(processingRequest.content);
      console.log(processingRequest.content);
    }
  }, [processingRequest]);
  useEffect(() => {
    if (aceeptedRequest?.status === "Done") {
      setChallengeAccepted(aceeptedRequest.content);
    }
  }, [aceeptedRequest]);

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
        {challengesRejected.map((challenge) => {
          if (challenge?.type !== "special") {
            return (
              <EventComponent
                key={challenge.id}
                event={challenge}
                navigation={props.navigation}
                wrong={challenge.context}
              />
            );
          }
        })}
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
        {challengesProcessing.map((challenge) => {
          if (challenge?.type === "special") {
            return (
              <SpecialEventComponent
                key={challenge.id}
                event={challenge}
                navigation={props.navigation}
                validating
              />
            );
          }
          return (
            <EventComponent
              event={challenge}
              navigation={props.navigation}
              validating
            />
          );
        })}
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
        {challengesAccepted.map((challenge) => {
          if (challenge?.type !== "special") {
            return (
              <EventComponent
                key={challenge.id}
                event={challenge}
                navigation={props.navigation}
                validate
              />
            );
          }
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default SentEventList;
