import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import OutlinedText from "../../components/OutlinedText";
import letterH from "../../assets/Letters/Italique/H.png";
import letteri from "../../assets/Letters/Italique/i.png";
import letters from "../../assets/Letters/Italique/s.png";
import lettert from "../../assets/Letters/Italique/t.png";
import lettero from "../../assets/Letters/Italique/o.png";
import letterr from "../../assets/Letters/Italique/r.png";
import lettere from "../../assets/Letters/Italique/e.png";
import letterd from "../../assets/Letters/Italique/d.png";
import { useTheme } from "../../Context/theme/ThemeContext";
import useFetch from "../../data/useFetch";
import { useAuthentification } from "../../Context/AuthContext";
import { useTranslation } from "../../Context/TranslationContext";
function GravityView(props) {
  const { themeStyle } = useTheme();
  const { selectedLangage } = useTranslation();
  const { userInfos, apiToken } = useAuthentification();

  const [text, setText] = useState("");
  const [request, newRequest] = useFetch();
  useEffect(() => {
    if (selectedLangage === "fr") {
      newRequest("presentation/3", "GET", {}, apiToken);
    } else {
      newRequest("presentation/4", "GET", {}, apiToken);
    }
  }, [selectedLangage]);
  useEffect(() => {
    if (request?.status === "Done") {
      console.info(newRequest);
      setText(
        request.content.content
          .replaceAll("\\n", "\n")
          .replaceAll("{name}", userInfos?.first_name || "")
      );
    }
  }, [request]);

  return (
    <View>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextletterContainer}>
          <OutlinedText
            letterImage={letterH}
            fontHeight={22}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letteri}
            fontHeight={20}
            style={{ marginRight: 1 }}
          />
          <OutlinedText
            letterImage={letters}
            fontHeight={17}
            style={{ marginRight: 1 }}
          />

          <OutlinedText
            letterImage={lettert}
            fontHeight={20}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={lettero}
            fontHeight={17}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={letteri}
            fontHeight={20}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={letterr}
            fontHeight={17}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={17}
            style={{ marginRight: 7 }}
          />
          <OutlinedText
            letterImage={letterd}
            fontHeight={20}
            style={{ marginRight: 0 }}
          />
          <OutlinedText
            letterImage={lettere}
            fontHeight={17}
            style={{ marginRight: 7 }}
          />
        </View>
        <Text style={[styles.labelText, { color: themeStyle.text }]}>
          GRAVITY
        </Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={[styles.historyText, { color: themeStyle.textless }]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    textAlignVertical: "top",

    color: "black",
    fontSize: 28,
    fontFamily: "ChangaOne_400Regular_Italic",
  },
  labelTextletterContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  labelTextLetter: {
    width: 20,
    height: 30,
    resizeMode: "contain",

    tintColor: "black",
    backgroundColor: "red",
  },
  historyContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  historyText: {
    fontFamily: "Neon",
    fontSize: 20,
    lineHeight: 23,
    textAlign: "justify",
  },
});

export default GravityView;
