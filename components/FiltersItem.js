import React from "react";
import ExpandedList from "./ExpandedList";
import FilterListIcon from "@material-ui/icons/FilterList";
function Filters(props) {
  const [filters, toggleFilters] = React.useState(false);
  const { classes } = props;
  return (
    <ExpandedList
      title="Фильтры"
      classes={classes}
      icon={FilterListIcon}
      toggle={filters}
      toggleList={toggleFilters}
      fallbackTitle="Нет созданных фильтров!"
    ></ExpandedList>
  );
}

export default Filters;
