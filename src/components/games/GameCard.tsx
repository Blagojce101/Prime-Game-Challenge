import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PlayArrow as PlayIcon,
} from "@mui/icons-material";
import type { Game } from "../../types/types";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import { getCategoryDisplayName } from "../../utils/gameFilters";
import { useSnackbar } from "notistack";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const { favorites, toggleFavorite, addToRecentlyViewed } = useGameContext();
  const { enqueueSnackbar } = useSnackbar();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFavorite = favorites.includes(game.id);

  const handlePlay = () => {
    addToRecentlyViewed(game.id);
    enqueueSnackbar(`Starting ${game.name} !`, { variant: "info" });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(game.id);
    enqueueSnackbar(
      isFavorite
        ? `${game.name} removed from favorites`
        : `${game.name} added to favorites`,
      {
        variant: isFavorite ? "warning" : "success",
        anchorOrigin: { vertical: "top", horizontal: "left" },
      },
    );
  };

  const getCategoryColor = (): "primary" | "secondary" | "error" => {
    switch (game.category) {
      case "slots":
        return "primary";
      case "table":
        return "secondary";
      case "live":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        },
        position: "relative",
        overflow: "hidden",
      }}>
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            transform: "scale(1.1)",
          },
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        {isFavorite ? (
          <FavoriteIcon sx={{ color: "#ef4444" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "white" }} />
        )}
      </IconButton>

      <Chip
        label={getCategoryDisplayName(game.category)}
        color={getCategoryColor()}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 1,
          fontWeight: 600,
          fontSize: "0.7rem",
        }}
      />

      <Box sx={{ position: "relative", paddingTop: "75%" }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            animation="wave"
          />
        )}
        <CardMedia
          component="img"
          image={game.image}
          alt={game.name}
          onLoad={() => setImageLoaded(true)}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          crossOrigin="anonymous"
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
          {game.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
          {game.provider}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<PlayIcon />}
          onClick={handlePlay}
          sx={{
            fontWeight: 600,
            py: 1,
          }}>
          Play Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
