import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type {
  FilterState,
  Game,
  GameCategory,
  GameContextType,
} from "../../types/types";
import {
  STORAGE_KEYS,
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorage";
import { applyAllFilters } from "../../utils/gameFilters";
import data from "../../data/db.json";

const initialFilters: FilterState = {
  searchQuery: "",
  category: "all",
  provider: "all",
  showFavoritesOnly: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

const fetchGamesFromLocalJson = async (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.games as Game[]);
    }, 300);
  });
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        setFavorites(getFromLocalStorage<string[]>(STORAGE_KEYS.FAVORITES, []));

        setRecentlyViewed(
          getFromLocalStorage<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []),
        );

        const cachedGames = getFromLocalStorage<Game[]>(STORAGE_KEYS.GAMES, []);
        if (cachedGames.length > 0) setGames(cachedGames);

        const fetchedGames = await fetchGamesFromLocalJson();

        setGames(fetchedGames);
        setToLocalStorage(STORAGE_KEYS.GAMES, fetchedGames);
      } catch {
        setError("Failed to load games");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFavorite = useCallback((gameId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId];

      setToLocalStorage(STORAGE_KEYS.FAVORITES, next);
      return next;
    });
  }, []);

  const addToRecentlyViewed = useCallback((gameId: string) => {
    setRecentlyViewed((prev) => {
      const next = [gameId, ...prev.filter((id) => id !== gameId)].slice(0, 5);

      setToLocalStorage(STORAGE_KEYS.RECENTLY_VIEWED, next);
      return next;
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setCategory = useCallback((category: GameCategory | "all") => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setProvider = useCallback((provider: string | "all") => {
    setFilters((prev) => ({ ...prev, provider }));
  }, []);

  const setShowFavoritesOnly = useCallback((show: boolean) => {
    setFilters((prev) => ({ ...prev, showFavoritesOnly: show }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredGames = useMemo(() => {
    return applyAllFilters(games, filters, favorites);
  }, [games, filters, favorites]);

  const contextValue: GameContextType = useMemo(
    () => ({
      games,
      filteredGames,
      favorites,
      recentlyViewed,
      filters,
      isLoading,
      error,
      toggleFavorite,
      addToRecentlyViewed,
      setSearchQuery,
      setCategory,
      setProvider,
      setShowFavoritesOnly,
      clearFilters,
    }),
    [
      games,
      filteredGames,
      favorites,
      recentlyViewed,
      filters,
      isLoading,
      error,
      toggleFavorite,
      addToRecentlyViewed,
      setSearchQuery,
      setCategory,
      setProvider,
      setShowFavoritesOnly,
      clearFilters,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameContext must be used within GameProvider");
  return context;
};
