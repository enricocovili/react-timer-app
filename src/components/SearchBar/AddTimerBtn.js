import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function AddTimerBtn(props) {
  const { createTimer } = props;
  return (
    <>
      <IconButton
        onClick={() => {
          createTimer();
        }}
      >
        <AddIcon style={{ color: "white" }} />
      </IconButton>
    </>
  );
}
