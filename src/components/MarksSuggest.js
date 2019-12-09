import React from "react";
import Button from "@material-ui/core/Button";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import ArrowTooltip from "./ArrowTooltip";
import AutocompleteList from "./../components/AutocompleteList";
import { useSelector } from "react-redux";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

export default function MarksSuggest(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { marks, setMarks } = props;
  const labels = useSelector(state => state.tags.marks);
  return (
    <React.Fragment>
      <ArrowTooltip
        button={
          <Button
            onClick={ev => setAnchorEl(ev.currentTarget)}
            className={classes.button}
          >
            <BookmarksIcon className={classes.icon}></BookmarksIcon>{" "}
          </Button>
        }
        title={"Выбрать метку"}
      ></ArrowTooltip>
      <AutocompleteList
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        pendingValue={marks}
        setPendingValue={setMarks}
        label={"Метки"}
        placeholder="Введите название марки"
        labels={labels}
        noLabels="Нет созданных меток!"
        tagIcon={item => (
          <LocalOfferIcon
            style={{ color: item.color, margin: "0px 10px 0px 3px" }}
          />
        )}
      ></AutocompleteList>
    </React.Fragment>
  );
}
