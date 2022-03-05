import React from "react";
import { StyleSheet, View, Text } from "react-native";

function PublicProfilView(props) {
  return (
    <View style={{ padding: 20, paddingTop: 70 }}>
      <Text style={styles.pageTitle}>Profil de Prénom</Text>
      <Text>Jolie photo avec un super filtre gravity</Text>
      <Text>Informations partagées (Réseaux sociaux, email, tel)</Text>
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

export default PublicProfilView;
