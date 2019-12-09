import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default selector => {
  const [list, toggleList] = React.useState(false);
  const [modal, toggleModal] = React.useState(false);
  const dispatch = useDispatch();
  const listItems = useSelector(selector);
  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);
  return {
    list,
    openModal,
    closeModal,
    dispatch,
    listItems,
    modal,
    toggleList
  };
};
