import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/GameContext/GameContext";

const SearchBar = () => {
  const { filters, setSearchQuery } = useGameContext();
  const [inputValue, setInputValue] = useState(filters.searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  useEffect(() => {
    setInputValue(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleClearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <Box sx={{ mb: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search games by name or provider..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: inputValue ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        sx={{ mb: 2 }}
      />

      <Divider orientation="horizontal" flexItem />
    </Box>
  );
};

export default SearchBar;
