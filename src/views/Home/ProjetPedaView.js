import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import ColorViewComponent from "../../components/ColoredViewComponent.js";
import { useTranslation } from "../../Context/TranslationContext";
import { useAuthentification } from "../../Context/AuthContext.js";
import useFetch from "../../data/useFetch.js";
import { useTheme } from "../../Context/theme/ThemeContext.js";
const { width, height } = Dimensions.get("screen");
function ProjetPedaView(props) {
  const { activeTheme, themeStyle } = useTheme();

  const { toggleLangage, langage, selectedLangage } = useTranslation();
  const { isFirstLogin, setIsFirstLogin, apiToken } = useAuthentification();
  const [link, setLink] = useState();
  const [request, newRequest] = useFetch();
  const [requestPoint, newRequestPoint] = useFetch();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (selectedLangage === "fr") {
      newRequest("presentation/5", "GET", {}, apiToken);
    } else {
      newRequest("presentation/6", "GET", {}, apiToken);
    }
    if (selectedLangage === "fr") {
      newRequestPoint("presentation/type/project/fr", "GET", {}, apiToken);
    } else {
      newRequestPoint("presentation/type/project/en", "GET", {}, apiToken);
    }
  }, []);
  useEffect(() => {
    if (request?.status === "Done") {
      setLink(request?.content.content);
    }
  }, [request]);
  useEffect(() => {
    if (requestPoint?.status === "Done" && request?.content?.length > 0) {
      setProjects(request?.content);
    }
  }, [requestPoint]);
  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity
        style={{ marginTop: projects?.length > 0 ? 20 : 0 }}
        onPress={() => Linking.openURL(link)}
        disabled={!link}
      >
        <ColorViewComponent coloredViewStyle={[styles.titleContainer]}>
          <Text style={styles.titleText}>{langage.openInNav}</Text>
        </ColorViewComponent>
      </TouchableOpacity>
      {projects?.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 20,
              marginTop: 20,
              fontFamily: "ChangaOne_400Regular",
              textAlign: "justify",
              color: themeStyle.textless,
            }}
          >
            {langage.projectInFewPoints}
          </Text>
          {projects?.map((project) => (
            <ProjectDetail project={project} key={project?.id} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function ProjectDetail({ project }) {
  const { activeTheme, themeStyle } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      width: width * 0.8,
      alignSelf: "center",
      marginTop: 20,

      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 15,
      display: "flex",
      backgroundColor: themeStyle.backless,
      flex: 1,
      flexGrow: 1,

      // alignItems: "center",
      padding: 20,
    },
  });
  return (
    <View
      style={styles.container}
      onPress={() => navigation.push("PublicProfil", { id: user?.user_id })}
    >
      <Text
        style={{
          width: width * 0.8 - 40,
          fontSize: 22,
          fontFamily: "ChangaOne_400Regular",
          color: themeStyle.textless,
          marginBottom: 0,
        }}
      >
        {project?.title}
      </Text>
      <Text
        style={{
          marginTop: 15,
          width: width * 0.8 - 40,
          fontSize: 18,
          lineHeight: 20,
          fontFamily: "Neon",
          textAlign: "justify",
          color: themeStyle.textless,
        }}
      >
        {project?.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
  titleContainer: {
    minWidth: width * 0.5,
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontFamily: "ChangaOne_400Regular",
    fontSize: 18,
  },
  bodyContainer: {
    marginTop: 200,

    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "Neon",
    textAlign: "center",
    fontSize: 30,
  },
  textSmall: {
    fontFamily: "Neon",
    textAlign: "center",
    lineHeight: 33,
    fontSize: 20,
  },
});

export default ProjetPedaView;
