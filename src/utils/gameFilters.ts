import type { FilterState, Game, GameCategory } from "../types/types";

export const filterBySearch = (games: Game[], query: string): Game[] => {
  if (!query.trim()) return games;

  const lowerQuery = query.toLowerCase().trim();
  return games.filter(
    (game) =>
      game.name.toLowerCase().includes(lowerQuery) ||
      game.provider.toLowerCase().includes(lowerQuery),
  );
};

export const filterByCategory = (
  games: Game[],
  category: GameCategory | "all",
): Game[] => {
  if (category === "all") return games;

  return games.filter((game) => game.category === category);
};

export const filterByFavorites = (
  games: Game[],
  favorites: string[],
  showFavoritesOnly: boolean,
): Game[] => {
  if (!showFavoritesOnly) return games;

  return games.filter((game) => favorites.includes(game.id));
};

export const applyAllFilters = (
  games: Game[],
  filters: FilterState,
  favorites: string[],
): Game[] => {
  let filtered = [...games];

  filtered = filterBySearch(filtered, filters.searchQuery);
  filtered = filterByCategory(filtered, filters.category);
  filtered = filterByFavorites(filtered, favorites, filters.showFavoritesOnly);

  return filtered;
};

export const getCategoryDisplayName = (
  category: GameCategory | "all",
): string => {
  const categoryNames: Record<GameCategory | "all", string> = {
    all: "All Games",
    slots: "Slots",
    table: "Table Games",
    live: "Live Games",
  };

  return categoryNames[category] || category;
};
