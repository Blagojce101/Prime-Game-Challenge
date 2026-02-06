import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Clear as ClearIcon,
  Apps as AllIcon,
  Favorite as FavoriteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faChessBoard,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import type { GameCategory } from "../../types/types";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import { getCategoryDisplayName } from "../../utils/gameFilters";
import { useDebounce } from "../../hooks/useDebounce";

const FilterBar = () => {
  const {
    filters,
    clearFilters,
    games,
    setShowFavoritesOnly,
    favorites,
    setCategory,
    setSearchQuery,
  } = useGameContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [inputValue, setInputValue] = useState(filters.searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  useEffect(() => {
    setInputValue(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleClearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.category !== "all" ||
    filters.showFavoritesOnly;

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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}>
      <Box sx={{ mb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search games by name or provider..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: inputValue ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{ mb: 2 }}
        />

        <Divider
          orientation="horizontal"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: 600 }}>
          Categories
        </Typography>

        {hasActiveFilters && (
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            sx={{ color: "text.secondary", paddingY: 0 }}>
            Clear Filters
          </Button>
        )}
      </Box>

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

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
    </Paper>
  );
};

export default FilterBar;
