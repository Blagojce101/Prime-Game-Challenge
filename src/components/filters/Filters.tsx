import { Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import ExpandableFilters from "./ExpandableFilters";

const Filters = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}>
      {/* <-------- SEARCH BAR --------> */}
      <SearchBar />

      {/* <-------- EXPANDABLE FILTERS --------> */}
      <ExpandableFilters />
    </Paper>
  );
};

export default Filters;
