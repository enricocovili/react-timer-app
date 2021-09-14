import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { getIdName } from "../utils";

export default function TitleBar(props) {
  const { id, removeTimer } = props;
  return (
    <div className="title-bar">
      <h2>{getIdName(id)}</h2>
      <IconButton
        // style={{ color: "white" }}
        aria-label="delete"
        color="default"
        onClick={() => {
          localStorage.removeItem(`input ${id}`);
          removeTimer();
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
