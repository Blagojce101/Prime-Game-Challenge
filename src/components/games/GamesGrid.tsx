import { Box, Grid, Typography, Paper, Skeleton, Fade } from "@mui/material";
import {
  SentimentDissatisfied as NoResultsIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import GameCard from "./GameCard";
import { useGameContext } from "../../contexts/GameContext/GameContext";

const GameCardSkeleton = () => {
  return (
    <Paper sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Skeleton
        variant="rectangular"
        sx={{ paddingTop: "75%" }}
        animation="wave"
      />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
        <Skeleton
          variant="rectangular"
          height={36}
          sx={{ mt: 1, borderRadius: 2 }}
          animation="wave"
        />
      </Box>
    </Paper>
  );
};

interface EmptyStateProps {
  showFavoritesOnly: boolean;
  hasSearchQuery: boolean;
}

const EmptyState = ({ showFavoritesOnly, hasSearchQuery }: EmptyStateProps) => {
  return (
    <Fade in timeout={300}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          backgroundColor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}>
        {showFavoritesOnly ? (
          <>
            <FavoriteIcon
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Favorite Games Yet
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Click the heart icon on any game to add it to your favorites.
            </Typography>
          </>
        ) : (
          <>
            <NoResultsIcon
              sx={{
                fontSize: 64,
                color: "text.disabled",
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Games Found
            </Typography>
            <Typography variant="body2" color="text.disabled">
              {hasSearchQuery
                ? "Try adjusting your search terms or clearing filters."
                : "Try selecting a different category or clearing filters."}
            </Typography>
          </>
        )}
      </Paper>
    </Fade>
  );
};

const GamesGrid = () => {
  const { filteredGames, isLoading, filters } = useGameContext();

  if (isLoading) {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: "text.secondary",
            fontWeight: 600,
          }}>
          Loading games...
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <GameCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (filteredGames.length === 0) {
    return (
      <EmptyState
        showFavoritesOnly={filters.showFavoritesOnly}
        hasSearchQuery={filters.searchQuery.length > 0}
      />
    );
  }

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          color: "text.secondary",
        }}>
        Showing <strong>{filteredGames.length}</strong>{" "}
        {filteredGames.length === 1 ? "game" : "games"}
        {filters.showFavoritesOnly && " (favorites only)"}
      </Typography>

      <Grid container spacing={3}>
        {filteredGames.map((game, index) => (
          <Fade in timeout={300 + index * 50} key={game.id}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <GameCard game={game} />
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Box>
  );
};

export default GamesGrid;
