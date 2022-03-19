import LoginView from "./src/views/LoginView";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import GravityHeadCrush from "./src/views/GravityHeadCrush";
import GravityCrush from "./src/views/GravityCrush";
import MainNavigator from "./src/routes/MainNavigator";
import { AuthProvider } from "./src/Context/AuthContext";
import { TranslationProvider } from "./src/Context/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";
function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
