import React, { useState, useEffect } from "react";
import { styled, alpha } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import { MenuItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.0),
  },
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

export default function PrimarySearchAppBar({
  createTimer,
  changeInputFilter,
  sortList,
}) {
  const [inputFilter, setinputFilter] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (sortMethod) => {
    setAnchorEl(null);
    if (typeof sortMethod !== "object") sortList(sortMethod);
  };

  useEffect(() => {
    changeInputFilter(inputFilter);
    // eslint-disable-next-line
  }, [inputFilter]);

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleClick}>
            <SortIcon
              style={{
                color: "white",
                cursor: "pointer",
                paddingRight: ".3em",
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("A-Z")}>A-Z</MenuItem>
            <MenuItem onClick={() => handleClose("Z-A")}>Z-A</MenuItem>
            <MenuItem onClick={() => handleClose("time-up")}>
              Time (ascending)
            </MenuItem>
            <MenuItem onClick={() => handleClose("time-down")}>
              Time (descendig)
            </MenuItem>
          </Menu>
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
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              onClick={() => {
                createTimer();
              }}
            >
              <AddIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
