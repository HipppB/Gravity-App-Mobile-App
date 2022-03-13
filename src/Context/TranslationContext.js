import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import texts from "../assets/Texts.json";
const TranslationContext = createContext({
  langage: texts.fr,
  toggleLangage: () => {},
  selectedLangage: "",
});

// create context
function TranslationProvider({ children }) {
  const [selectedLangage, setSelectedLangage] = useState("fr");
  const [langage, setLangage] = useState(texts["fr"]);
  const toggleLangage = () => {
    if (selectedLangage === "fr") {
      setSelectedLangage("en");
      setLangage(texts["en"]);
      AsyncStorage.setItem("langage", "en");
      console.log("en");
    } else {
      setSelectedLangage("fr");
      setLangage(texts["fr"]);
      AsyncStorage.setItem("langage", "fr");
      console.log("fr");
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("langage").then((result) => {
      setSelectedLangage(result);
      setLangage(texts[result]);
    });
  }, []);

  return (
    <TranslationContext.Provider
      value={{
        langage,
        toggleLangage,
        selectedLangage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
const useTranslation = () => useContext(TranslationContext);

export { TranslationProvider, useTranslation };
