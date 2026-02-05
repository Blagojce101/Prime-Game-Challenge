import { SnackbarProvider } from "notistack";
import CasinoLobby from "./components/CasinoLobby";
import { GameProvider } from "./contexts/GameContext/GameContext";

const App = () => {
  return (
    <GameProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2500}>
        <CasinoLobby />
      </SnackbarProvider>
    </GameProvider>
  );
};

export default App;
