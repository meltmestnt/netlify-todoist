import React from "react";
import Button from "@material-ui/core/Button";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import ArrowTooltip from "./ArrowTooltip";
import AutocompleteDialog from "./AutocompleteDialog";
import { useSelector } from "react-redux";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

export default function MarksSuggest(props) {
  const { classes } = props;
  const [dialog, toggleDialog] = React.useState(null);
  const { marks, setMarks } = props;
  const labels = useSelector(state => state.tags.marks);
  return (
    <React.Fragment>
      <ArrowTooltip
        button={
          <Button onClick={ev => toggleDialog(true)} className={classes.button}>
            <BookmarksIcon className={classes.icon}></BookmarksIcon>{" "}
          </Button>
        }
        title={"Выбрать метку"}
      ></ArrowTooltip>
      <AutocompleteDialog
        dialog={dialog}
        toggleDialog={toggleDialog}
        pendingValue={marks}
        setPendingValue={setMarks}
        label="Метки"
        noLabels="Нет созданных меток!"
        placeholder="Введите название метки"
        labels={labels}
      ></AutocompleteDialog>
    </React.Fragment>
  );
}
