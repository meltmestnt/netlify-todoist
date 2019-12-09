import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  dateInfo: {
    fontSize: "0.85rem",
    margin: 10,
    color: "gray"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.type === "light" ? "black" : "#D3D3D3",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  disabled: {
    opacity: 0.7
  }
}));
function DayInfo(props) {
  const day = props.getDay();
  const ownClasses = useStyles();
  const { date, disabled } = props;
  const to =
    props.to === "Сегодня"
      ? "сегодня"
      : props.to === "Завтра"
      ? "завтра"
      : `${props.to}?date=${day.date}&month=${day.monthName}`;
  return (
    <Typography variant="h5">
      {disabled ? (
        <span className={ownClasses.disabled}>{date}</span>
      ) : (
        <Link className={ownClasses.link} to={`/${to}`}>
          {date}
        </Link>
      )}
      <span
        className={ownClasses.dateInfo}
      >{`${day.weekDay} ${day.date}, ${day.monthName}`}</span>
    </Typography>
  );
}

export default DayInfo;
