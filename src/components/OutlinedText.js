import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useTheme } from "../Context/theme/ThemeContext";

function OutlinedText({ letterImage, ...props }) {
  const { width, height } = Image.resolveAssetSource(letterImage);
  const { themeStyle } = useTheme();

  let fontImageWidth = props?.fontWidth;
  let fontImageHeight = props?.fontHeight;
  if (props?.fontWidth && !props?.fontHeight) {
    fontImageHeight = (fontImageWidth * height) / width;
  } else if (!props?.fontWidth && props?.fontHeight) {
    fontImageWidth = (fontImageHeight * width) / height;
  }

  return (
    <Image
      source={letterImage}
      style={[
        {
          width: fontImageWidth,
          height: fontImageHeight,
          resizeMode: "contain",
          top: props?.top,
          tintColor: themeStyle.text,
        },
        props?.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({});

export default OutlinedText;
