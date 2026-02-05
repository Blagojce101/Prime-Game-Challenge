import { Box, Container } from "@mui/material";
import Header from "./layout/Header";
import GamesGrid from "../components/games/GamesGrid";
import RecentlyViewed from "./games/RecentlyViewed";

const CasinoLobby = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}>
      <Header />

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          Filters
          {/* Add Filters component, when is finished */}
          {/* <Filters /> */}
        </Box>

        <RecentlyViewed />

        <GamesGrid />
      </Container>
    </Box>
  );
};

export default CasinoLobby;
