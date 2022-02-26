import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function DetailCalendarView({ eventID, eventName, eventDate, eventImageUrl }) {
  return (
    <SafeAreaView>
      <Text>
        Page à design -{"\n"}
        Vue détaillée de l'event : {"\n"}
        Image de présentation - Où ? Quand ? Quoi ? {"\n"}
        Bouton s'inscrire - Liste des inscrits {"\n"}
        Bouton Ajout au calendrier {"\n"}
        MiniMap avec aperçu de la localisation ? {"\n"}
        Texte decriptif {"\n"}
        Bouton Retour à la liste du calendrier {"\n"}
        Bouton Voiture (Pourras être activé par la com sur certains evenements)
        pour accès vue covoiturage
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default DetailCalendarView;
