import React from "react";
import Container from "@material-ui/core/Container";
import WeekDayContainerTask from "./WeekDayContainerTask";
import { getWeek } from "./../utils/date";
import Typography from "@material-ui/core/Typography";
import WithDragAndDrop from "./WithDragAndDrop";
import { sortColumn } from "./../redux/actions";
import { useSelector } from "react-redux";
function WeekContent(props) {
  const { classes } = props;

  const [dayTask, toggleDayTask] = React.useState(null);
  const week = React.useMemo(() => getWeek(), []);
  const columns = useSelector(state => state.tasks.columns);

  return (
    <WithDragAndDrop action={sortColumn} columns={columns}>
      {() => (
        <Container className={classes.content}>
          <Typography variant="h5" style={{ margin: "20px 0px 10px 0px" }}>
            Следующие 7 дней
          </Typography>
          {week.map(d => {
            return (
              <div
                key={d.weekDay}
                style={{ margin: "20px 0px", width: "100%" }}
              >
                <WeekDayContainerTask
                  dayTask={dayTask}
                  column={columns[d.weekDay]}
                  toggleDayTask={toggleDayTask}
                  day={d}
                ></WeekDayContainerTask>
              </div>
            );
          })}
        </Container>
      )}
    </WithDragAndDrop>
  );
}

export default WeekContent;
