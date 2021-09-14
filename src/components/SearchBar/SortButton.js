import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import { MenuItem } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import { IconButton } from "@material-ui/core";

function SortButton(props) {
  const { sortList } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (sortMethod) => {
    setAnchorEl(null);
    if (typeof sortMethod !== "object") sortList(sortMethod);
  };

  return (
    <>
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
    </>
  );
}

export default SortButton;
