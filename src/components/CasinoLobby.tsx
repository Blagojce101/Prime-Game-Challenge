import { Box, Container } from "@mui/material";
import Header from "./layout/Header";
import GamesGrid from "../components/games/GamesGrid";
import RecentlyViewed from "./games/RecentlyViewed";
import Filters from "./filters/Filters";

const CasinoLobby = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}>
      {/* <-------- HEADER --------> */}
      <Header />

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}>
        {/* <-------- FILTERS --------> */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Filters />
        </Box>

        {/* <-------- RECENTLY VIEWED --------> */}
        <RecentlyViewed />

        {/* <-------- GAMES GRID --------> */}
        <GamesGrid />
      </Container>
    </Box>
  );
};

export default CasinoLobby;
