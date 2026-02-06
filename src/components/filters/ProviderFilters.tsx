import { Box, Chip, useMediaQuery, useTheme } from "@mui/material";
import { useGameContext } from "../../contexts/GameContext/GameContext";

const ProviderFilters = () => {
  const { filters, games, setProvider } = useGameContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const providers = Array.from(new Set(games.map((g) => g.provider)));
  providers.unshift("all");

  const getProviderCount = (provider: string) =>
    provider === "all"
      ? games.length
      : games.filter((g) => g.provider === provider).length;

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
        {providers.map((provider) => (
          <Chip
            key={provider}
            label={`${provider === "all" ? "All Providers" : provider} (${getProviderCount(provider)})`}
            onClick={() => setProvider(provider)}
            variant={filters.provider === provider ? "filled" : "outlined"}
            color={filters.provider === provider ? "primary" : "default"}
            sx={{ flexShrink: 0, px: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProviderFilters;
