import React from "react";
import { StyleSheet, View, Text } from "react-native";

function NotificationCenterView(props) {
  return (
    <View style={{ padding: 20, paddingTop: 70 }}>
      <Text style={styles.pageTitle}>Centre de notification</Text>
      <Text>Aucune notification</Text>
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

export default NotificationCenterView;
