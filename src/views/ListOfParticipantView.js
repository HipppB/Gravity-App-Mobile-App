import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTranslation } from "../Context/TranslationContext";

function ListOfParticipantView(props) {
  const { toggleLangage, langage } = useTranslation();

  return (
    <View style={{ padding: 20, paddingTop: 70 }}>
      <Text style={styles.pageTitle}>{langage.participant}</Text>
      <Text>Aucun participant. Rip.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 30,
  },
});

export default ListOfParticipantView;
