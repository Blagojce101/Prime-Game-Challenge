import { Box, Paper, Button, Typography } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import SearchBar from "./SearchBar";
import CategoryFilters from "./CategoryFilters";

const Filters = () => {
  const { filters, clearFilters } = useGameContext();

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.category !== "all" ||
    filters.showFavoritesOnly;

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
      {/* <-------- SEARCH BAR --------> */}
      <SearchBar />

      {/* <-------- CATEGORIES TITLE & CLEAR FILTERS --------> */}
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

      {/* <-------- CATEGORIES CHIPS --------> */}
      <CategoryFilters />
    </Paper>
  );
};

export default Filters;
