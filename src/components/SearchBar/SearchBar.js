import React, { useState, useEffect } from "react";
import { styled, alpha } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SortButton from "./SortButton";
import AddTimerBtn from "./AddTimerBtn";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.0),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchBar(props) {
  const { createTimer, changeInputFilter, sortList } = props;
  const [inputFilter, setinputFilter] = useState("");

  useEffect(() => {
    changeInputFilter(inputFilter);
    // eslint-disable-next-line
  }, [inputFilter]);

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <SortButton
            sortList={(sortMethod) => {
              sortList(sortMethod);
            }}
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(event) => setinputFilter(event.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.target.value = "";
                  setinputFilter("");
                }
              }}
            />
          </Search>
          <AddTimerBtn createTimer={createTimer} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
