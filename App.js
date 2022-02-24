import LoginView from "./src/views/LoginView";

import GravityHeadCrush from "./src/views/GravityHeadCrush";
import GravityCrush from "./src/views/GravityCrush";
import MainNavigator from "./src/routes/MainNavigator";
import { AuthProvider } from "./src/Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}

export default App;
