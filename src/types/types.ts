export type GameCategory = "slots" | "table" | "live";

export type ThemeMode = "light" | "dark";

export interface Game {
  id: string;
  name: string;
  provider: string;
  image: string;
  category: GameCategory;
}

export interface FilterState {
  searchQuery: string;
  category: GameCategory | "all";
  showFavoritesOnly: boolean;
}

export interface GameContextState {
  games: Game[];
  favorites: string[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  recentlyViewed: string[];
}

export interface GameContextActions {
  toggleFavorite: (gameId: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: GameCategory | "all") => void;
  setShowFavoritesOnly: (show: boolean) => void;
  clearFilters: () => void;
  addToRecentlyViewed: (gameId: string) => void;
}

export interface GameContextType extends GameContextState, GameContextActions {
  filteredGames: Game[];
}
