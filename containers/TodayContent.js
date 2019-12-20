import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { getToday } from "./../utils/date";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GradeIcon from "@material-ui/icons/Grade";
import MainImage from "./../components/MainImage";
import ArrowTooltip from "./../components/ArrowTooltip";
import CreateTask from "./CreateTask";
import ToAddTaskButton from "./../components/ToAddTaskButton";
import DayInfo from "./../components/DayInfo";
import { useSelector } from "react-redux";
import DisplayList from "./DisplayList";
import useTaskFilter from "./../utils/taskFilter";
import WithDragAndDrop from "./WithDragAndDrop";
import { sortColumn } from "./../redux/actions";
import ArrowAdviceButton from "./../components/arrowAdviceButton";
import generateId from "./../utils/generator";
import PreloaderContainer from "./PreloaderContainer";
let id = generateId(10);

function TodayContent(props) {
  const { classes } = props;
  const [isCreating, toggleTabs] = React.useState(false);
  const column = useSelector(state => state.tasks.columns[getToday().weekDay]);
  const tasks = useTaskFilter(column.taskIds);

  const tooltipButton = (
    <ArrowAdviceButton text="Заведите привычку на день"></ArrowAdviceButton>
  );
  const mainContent = (
    <>
      <DayInfo disabled to="Сегодня" getDay={getToday} date="Сегодня"></DayInfo>

      <ToAddTaskButton toggleTabs={toggleTabs}></ToAddTaskButton>

      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "25px 0px",
          flexGrow: "1"
        }}
      >
        <MainImage></MainImage>
        <Typography variant="subtitle1" style={{ margin: "15px 0px 5px 0px" }}>
          Чёткое видение грядущего дня
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "gray",
            textAlign: "center",
            margin: "5px 0px",
            fontSize: "0.8rem"
          }}
        >
          Все ваши задачи на сегодня отображаются здесь.
        </Typography>
        <Button
          variant="contained"
          style={{ margin: "10px 0px", textTransform: "inherit" }}
          color="primary"
          onClick={e => toggleTabs(true)}
        >
          Добавить задачу
        </Button>

        <ArrowTooltip
          button={tooltipButton}
          title={
            <>
              <GradeIcon color="secondary" />
              <Typography style={{ fontSize: "1rem", margin: "0px 10px" }}>
                Заведите привычку на день
              </Typography>
            </>
          }
          body={
            <Typography style={{ fontSize: "0.8rem" }}>
              Каждое утро выделяйте 10 минут на то, чтобы прояснить свой ум и
              спланировать день.
            </Typography>
          }
        ></ArrowTooltip>
      </Container>
    </>
  );
  const withoutTasks = isCreating ? (
    <CreateTask
      date={column.date}
      column={column}
      cancel={() => toggleTabs(false)}
    ></CreateTask>
  ) : (
    mainContent
  );
  const withTasks = (
    <PreloaderContainer list={tasks}>
      <DayInfo to="Сегодня" disabled getDay={getToday} date="Сегодня"></DayInfo>
      <DisplayList list={tasks} id={id} />
      {isCreating ? (
        <CreateTask
          column={column}
          date={column.date}
          cancel={() => toggleTabs(false)}
        ></CreateTask>
      ) : (
        <ToAddTaskButton toggleTabs={toggleTabs}></ToAddTaskButton>
      )}
    </PreloaderContainer>
  );
  return (
    <WithDragAndDrop columns={column}>
      {() => (
        <Container className={classes.content}>
          {tasks.length > 0 ? withTasks : withoutTasks}
        </Container>
      )}
    </WithDragAndDrop>
  );
}

export default TodayContent;
