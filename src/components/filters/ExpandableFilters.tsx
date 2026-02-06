import { Box, Button, Collapse, Typography } from "@mui/material";
import CategoryFilters from "./CategoryFilters";
import ProviderFilters from "./ProviderFilters";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import { Clear as ClearIcon } from "@mui/icons-material";

const ExpandableFilters = () => {
  const { filters, clearFilters, expandFilters } = useGameContext();

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.category !== "all" ||
    filters.showFavoritesOnly ||
    filters.provider !== "all";

  return (
    <Collapse in={expandFilters} timeout="auto" unmountOnExit>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* <-------- CATEGORIES --------> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
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

        <CategoryFilters />

        {/* <-------- PROVIDERS --------> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", fontWeight: 600 }}>
            Providers
          </Typography>
        </Box>

        <ProviderFilters />
      </Box>
    </Collapse>
  );
};

export default ExpandableFilters;
