import LoginView from "./src/views/LoginView";

import GravityHeadCrush from "./src/views/GravityHeadCrush";
import GravityCrush from "./src/views/GravityCrush";
import MainNavigator from "./src/routes/MainNavigator";
import { AuthProvider } from "./src/Context/AuthContext";
import { TranslationProvider } from "./src/Context/TranslationContext";
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
