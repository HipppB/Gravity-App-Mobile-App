import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import checkMark from "../assets/images/logos/Couleur/LogoNoNomNoFond.png";
function CheckBoxComponent({ children, value, setValue }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setValue(!value)}>
        <View style={styles.box}>
          {value ? (
            <Image
              source={checkMark}
              style={{
                width: 30,
                height: 30,

                zIndex: 1,
                position: "absolute",
                top: -8,
                left: -8,
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  box: {
    top: 2,
    height: 20,
    width: 20,
    borderWidth: 2,
    marginRight: 10,
  },
});

export default CheckBoxComponent;
