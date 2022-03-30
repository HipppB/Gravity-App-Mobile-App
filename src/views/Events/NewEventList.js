import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useAuthentification } from "../../Context/AuthContext";
import useFetch from "../../data/useFetch";
import SpecialEventComponent from "../../components/SpecialEventComponent";
import EventComponent from "../../components/EventComponent";
function NewEventList(props) {
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
      {challengesSpecial.map((event) => (
        <SpecialEventComponent
          navigation={props.navigation}
          event={event}
          key={(Math.random() * 1000).toFixed()}
        />
      ))}
      {challengesNormal.map((event) => (
        <EventComponent
          navigation={props.navigation}
          event={event}
          key={(Math.random() * 1000).toFixed()}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default NewEventList;
