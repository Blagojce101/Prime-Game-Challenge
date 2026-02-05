import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Casino as CasinoIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import { useGameContext } from "../../contexts/GameContext/GameContext";

const Header = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { favorites } = useGameContext();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <CasinoIcon
            sx={{
              fontSize: 32,
              color: "primary.main",
            }}
          />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              display: { xs: "none", sm: "block" },
            }}>
            Casino Lobby
          </Typography>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              display: { xs: "block", sm: "none" },
            }}>
            Casino
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={`${favorites.length} favorites`}>
            <IconButton color="inherit" sx={{ color: "text.secondary" }}>
              <Badge badgeContent={favorites.length} color="secondary">
                <FavoriteIcon
                  sx={{
                    color: favorites.length > 0 ? "error.main" : "inherit",
                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }>
            <IconButton onClick={toggleTheme} sx={{ color: "text.secondary" }}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
