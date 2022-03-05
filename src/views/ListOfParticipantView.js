import React from "react";
import { StyleSheet, View, Text } from "react-native";

function ListOfParticipantView(props) {
  return (
    <View style={{ padding: 20, paddingTop: 70 }}>
      <Text style={styles.pageTitle}>Liste des participants</Text>
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
