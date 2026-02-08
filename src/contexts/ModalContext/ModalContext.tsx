import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Game, ModalSize } from "../../types/types";

interface ModalContextType {
  open: boolean;
  game: Game | null;
  size: ModalSize;
  openModal: (params: { game: Game; size?: ModalSize }) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const [size, setSize] = useState<ModalSize>("md");

  const openModal = useCallback(
    ({ game, size = "md" }: { game: Game; size?: ModalSize }) => {
      setGame(game);
      setSize(size);
      setOpen(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setOpen(false);
    setGame(null);
  }, []);

  return (
    <ModalContext.Provider value={{ open, game, size, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};
