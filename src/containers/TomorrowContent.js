import React from "react";
import Container from "@material-ui/core/Container";
import { getTomorrowDate } from "./../utils/date";
import { getTomorrow } from "./../utils/date";
import CreateTask from "./CreateTask";
import ToAddTaskButton from "./../components/ToAddTaskButton";
import DayInfo from "./../components/DayInfo";
import WithDragAndDrop from "./WithDragAndDrop";
import DisplayList from "./DisplayList";
import generateId from "./../utils/generator";
import { useSelector } from "react-redux";
import useTaskFilter from "./../utils/taskFilter";
import PreloaderContainer from "./PreloaderContainer";
const id = generateId(10);
function TodayContent(props) {
  const { classes } = props;
  const [isCreating, toggleTabs] = React.useState(false);
  const column = useSelector(
    state => state.tasks.columns[getTomorrow().weekDay]
  );
  const tasks = useTaskFilter(column.taskIds);
  return (
    <Container className={classes.content}>
      <PreloaderContainer list={tasks}>
        <DayInfo
          disabled
          to="/Завтра"
          getDay={getTomorrow}
          date="Завтра"
        ></DayInfo>
        <WithDragAndDrop columns={column}>
          {() => <DisplayList list={tasks} id={id}></DisplayList>}
        </WithDragAndDrop>
        {isCreating ? (
          <CreateTask
            column={column}
            date={getTomorrowDate()}
            cancel={() => toggleTabs(false)}
          ></CreateTask>
        ) : (
          <ToAddTaskButton
            date={"Завтра"}
            toggleTabs={toggleTabs}
          ></ToAddTaskButton>
        )}
      </PreloaderContainer>
    </Container>
  );
}

export default TodayContent;
