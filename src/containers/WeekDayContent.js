import React from "react";
import queryString from "query-string";
import Container from "@material-ui/core/Container";
import CreateTask from "./CreateTask";
import ToAddTaskButton from "./../components/ToAddTaskButton";
import DayInfo from "./../components/DayInfo";
import WithDragAndDrop from "./WithDragAndDrop";
import DisplayList from "./DisplayList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useTaskFilter from "./../utils/taskFilter";
import { getDateFromParams } from "../utils/date";
function WeekDayContent(props) {
  const { classes, location } = props;
  const { id } = useParams();
  const parsed = queryString.parse(location.search);
  const column = useSelector(state => state.tasks.columns[id]);
  const day = {
    date: parsed.date,
    monthName: parsed.month,
    weekDay: id
  };
  const tasks = useTaskFilter(column.taskIds);
  const [isCreating, toggleTabs] = React.useState(false);
  return (
    <Container className={classes.content}>
      <DayInfo
        to={`/неделя/${id}?date=${day.date}&month=${day.monthName}`}
        disabled
        getDay={() => day}
        date={id}
      ></DayInfo>
      <WithDragAndDrop columns={column}>
        {() => <DisplayList list={tasks} id={id}></DisplayList>}
      </WithDragAndDrop>
      {isCreating ? (
        <CreateTask
          column={column}
          date={getDateFromParams(day)}
          cancel={() => toggleTabs(false)}
        ></CreateTask>
      ) : (
        <ToAddTaskButton
          date={"Завтра"}
          toggleTabs={toggleTabs}
        ></ToAddTaskButton>
      )}
    </Container>
  );
}

export default WeekDayContent;
