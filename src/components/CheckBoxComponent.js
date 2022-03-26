import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import checkMark from "../assets/images/logos/Couleur/LogoNoNomNoFond.png";

import { useTheme } from "../Context/theme/ThemeContext";
function CheckBoxComponent({ children, value, setValue }) {
  const { themeStyle } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setValue(!value)}>
        <View style={[styles.box, { borderColor: themeStyle.textless }]}>
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
      </Pressable>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  box: {
    alignSelf: "center",
    height: 20,
    width: 20,
    borderWidth: 2,
    marginRight: 10,
  },
});

export default CheckBoxComponent;
