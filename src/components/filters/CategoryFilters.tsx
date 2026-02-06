import React from "react";
import { Box, Chip, useMediaQuery, useTheme } from "@mui/material";
import { Apps as AllIcon, Favorite as FavoriteIcon } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faChessBoard,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import type { GameCategory } from "../../types/types";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import { getCategoryDisplayName } from "../../utils/gameFilters";

const CategoryFilters = () => {
  const { filters, games, setShowFavoritesOnly, favorites, setCategory } =
    useGameContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getCategoryCount = (category: GameCategory | "all") =>
    category === "all"
      ? games.length
      : games.filter((g) => g.category === category).length;

  const categories: Array<{
    value: GameCategory | "all";
    icon: React.ReactNode;
  }> = [
    { value: "all", icon: <AllIcon fontSize="small" /> },
    { value: "slots", icon: <FontAwesomeIcon icon={faDice} /> },
    { value: "table", icon: <FontAwesomeIcon icon={faChessBoard} /> },
    { value: "live", icon: <FontAwesomeIcon icon={faVideo} /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: isMobile ? "nowrap" : "wrap",
          overflowX: isMobile ? "auto" : "visible",
          pb: isMobile ? 1 : 0,
          "&::-webkit-scrollbar": { display: "none" },
        }}>
        {categories.map(({ value, icon }) => (
          <Chip
            key={value}
            icon={icon as React.ReactElement}
            label={`${getCategoryDisplayName(value)} (${getCategoryCount(
              value,
            )})`}
            onClick={() => setCategory(value)}
            variant={filters.category === value ? "filled" : "outlined"}
            color={filters.category === value ? "primary" : "default"}
            sx={{ flexShrink: 0, paddingX: 1 }}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Chip
          sx={{ paddingX: 1 }}
          icon={
            <FavoriteIcon
              fontSize="small"
              color={favorites.length !== 0 ? "error" : "inherit"}
            />
          }
          label={`Favorites Only (${favorites.length})`}
          clickable
          disabled={favorites.length === 0}
          color={filters.showFavoritesOnly ? "error" : "default"}
          variant={filters.showFavoritesOnly ? "filled" : "outlined"}
          onClick={() => setShowFavoritesOnly(!filters.showFavoritesOnly)}
        />
      </Box>
    </Box>
  );
};

export default CategoryFilters;
