import React from "react";
import ExpandedList from "./ExpandedList";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import useStateList from "./../utils/stateList";
import { createMark } from "./../redux/actions";
import TagAddDialog from "./TagAddDialog";
function MarksItems(props) {
  const { classes } = props;
  const {
    listItems: marksList,
    dispatch,
    list: marks,
    modal,
    toggleList: toggleMarks,
    openModal: openMarksModal,
    closeModal: closeMarksModal
  } = useStateList(state => state.tags.marks);

  const addMark = pr => {
    if (pr.name.length >= 3 && pr.color) {
      dispatch(createMark(pr));
    }
  };
  return (
    <>
      <ExpandedList
        title="Метки"
        id="marks"
        classes={classes}
        toggle={marks}
        toggleList={toggleMarks}
        icon={BookmarksIcon}
        fallbackTitle={"Нет созданных меток!"}
        subitems={marksList}
        addSubitem={addMark}
        openModal={openMarksModal}
        draggable
        tagIcon={item => (
          <LocalOfferIcon
            style={{ color: item.color, margin: "0px 3px 0px 0px" }}
          />
        )}
      ></ExpandedList>
      <TagAddDialog
        open={modal}
        close={closeMarksModal}
        addProject={addMark}
        title="метку"
        body="метки"
      ></TagAddDialog>
    </>
  );
}

export default MarksItems;
