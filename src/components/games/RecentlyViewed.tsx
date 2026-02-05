import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import { useSnackbar } from "notistack";

const RecentlyViewed = () => {
  const {
    games,
    recentlyViewed,
    favorites,
    toggleFavorite,
    addToRecentlyViewed,
  } = useGameContext();

  const { enqueueSnackbar } = useSnackbar();

  const recentGames = recentlyViewed
    .map((id) => games.find((game) => game.id === id))
    .filter(Boolean);

  if (recentGames.length === 0) {
    return null;
  }

  const handleFavorite = (gameId: string, isCurrentlyFavorite: boolean) => {
    toggleFavorite(gameId);

    enqueueSnackbar(
      isCurrentlyFavorite ? "Removed from favorites" : "Added to favorites",
      {
        variant: isCurrentlyFavorite ? "warning" : "success",
        anchorOrigin: { vertical: "top", horizontal: "left" },
      },
    );
  };

  const handleClick = (gameId: string, gameName: string) => {
    addToRecentlyViewed(gameId);

    enqueueSnackbar(`Opened ${gameName}`, {
      variant: "info",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  return (
    <Fade in timeout={300}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <HistoryIcon sx={{ color: "text.secondary" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "text.primary" }}>
            Recently Viewed
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "action.hover",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "action.disabled",
              borderRadius: 4,
              "&:hover": { backgroundColor: "action.active" },
            },
          }}>
          {recentGames.map((game) => {
            if (!game) return null;
            const isFavorite = favorites.includes(game.id);

            return (
              <Card
                key={game.id}
                sx={{
                  minWidth: 160,
                  maxWidth: 160,
                  flexShrink: 0,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                  position: "relative",
                }}
                onClick={() => handleClick(game.id, game.name)}>
                <Tooltip
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(game.id, isFavorite);
                    }}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      zIndex: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                    }}>
                    {isFavorite ? (
                      <FavoriteIcon sx={{ fontSize: 16, color: "#ef4444" }} />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{ fontSize: 16, color: "white" }}
                      />
                    )}
                  </IconButton>
                </Tooltip>

                <CardMedia
                  component="img"
                  height="100"
                  image={game.image}
                  alt={game.name}
                  sx={{ objectFit: "cover" }}
                  crossOrigin="anonymous"
                />
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    {game.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    {game.provider}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Fade>
  );
};

export default RecentlyViewed;
