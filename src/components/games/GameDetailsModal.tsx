import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useModal } from "../../contexts/ModalContext/ModalContext";
import { useGameContext } from "../../contexts/GameContext/GameContext";
import {
  getCategoryColor,
  getCategoryDisplayName,
} from "../../utils/gameFilters";
import { useSnackbar } from "notistack";
import RecentlyViewed from "./RecentlyViewed";

const sizeMap = {
  sm: 420,
  md: 640,
  lg: 900,
  fullscreen: "100%",
};

const GameDetailsModal = () => {
  const { open, game, size, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const { favorites, toggleFavorite, addToRecentlyViewed } = useGameContext();

  if (!game) return null;

  const isFavorite = favorites.includes(game.id);

  const handlePlay = () => {
    addToRecentlyViewed(game.id);
    enqueueSnackbar(`Starting ${game.name} !`, { variant: "info" });
  };

  const handleFavorite = (e: React.MouseEvent) => {
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

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: sizeMap[size],
            maxHeight: "90vh",
            borderRadius: 2,
            backgroundImage: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
      }}>
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={game.image}
          alt={game.name}
          sx={{
            width: "100%",
            height: 360,
            objectFit: "cover",
          }}
        />

        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}>
          <CloseIcon />
        </IconButton>

        <Chip
          label={getCategoryDisplayName(game.category)}
          color={getCategoryColor(game)}
          size="small"
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1,
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {game.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {game.provider}
            </Typography>
          </Box>

          <IconButton onClick={handleFavorite}>
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "error.main" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enjoy one of our premium{" "}
          {getCategoryDisplayName(game.category).toLocaleLowerCase()} games by{" "}
          {game.provider}. Optimized for desktop and mobile play.
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={<PlayArrowIcon />}
          onClick={handlePlay}
          sx={{
            fontWeight: 700,
            py: 1.4,
            borderRadius: 2,
          }}>
          Start Game
        </Button>

        <Box sx={{ mt: 2 }}>
          <RecentlyViewed />
        </Box>
      </Box>
    </Dialog>
  );
};

export default GameDetailsModal;
