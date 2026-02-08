import { SnackbarProvider } from "notistack";
import CasinoLobby from "./components/CasinoLobby";
import { GameProvider } from "./contexts/GameContext/GameContext";
import { ModalProvider } from "./contexts/ModalContext/ModalContext";
import GameDetailsModal from "./components/games/GameDetailsModal";

const App = () => {
  return (
    <GameProvider>
      <ModalProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2500}>
          <CasinoLobby />
          <GameDetailsModal />
        </SnackbarProvider>
      </ModalProvider>
    </GameProvider>
  );
};

export default App;
