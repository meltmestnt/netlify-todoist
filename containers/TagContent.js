import React from "react";
import CreateTask from "./CreateTask";
import ToAddTaskButton from "./../components/ToAddTaskButton";
import DayInfo from "./../components/DayInfo";
import WithDragAndDrop from "./WithDragAndDrop";
import DisplayList from "./DisplayList";
import { useTagTasks, useDetermineTag } from "../utils/taskFilter";
import Container from "@material-ui/core/Container";
import queryString from "query-string";
import TagName from "./../components/TagName";
import Typography from "@material-ui/core/Typography";
import TagImage from "./../components/TagImage";
import Button from "@material-ui/core/Button";
import GradeIcon from "@material-ui/icons/Grade";
import ArrowTooltip from "./../components/ArrowTooltip";
import ArrowAdviceButton from "./../components/arrowAdviceButton";
import NotFoundImage from "./../components/NotFoundImage";
import PreloaderContainer from "./PreloaderContainer";
export default function(props) {
  const [isCreating, toggleTabs] = React.useState(false);
  const parsed = queryString.parse(props.location.search);
  const tag = useDetermineTag(parsed.id);
  const tasks = useTagTasks(tag);

  const type = tag && `${tag.type === "project" ? "проекты" : "метки"}`;
  const tooltipButton = tag ? (
    <ArrowAdviceButton text={`Как использовать ${type}`}></ArrowAdviceButton>
  ) : null;
  return (
    <Container className={props.classes.content}>
      {tag ? (
        <>
          <PreloaderContainer list={tasks}>
            <TagName name={tag.name}></TagName>
            <WithDragAndDrop columns={tag}>
              {() => <DisplayList list={tasks} id={parsed.id}></DisplayList>}
            </WithDragAndDrop>
            {isCreating ? (
              <CreateTask
                column={null}
                tag={tag}
                date={null}
                cancel={() => toggleTabs(false)}
              ></CreateTask>
            ) : (
              <ToAddTaskButton
                date={"Завтра"}
                toggleTabs={toggleTabs}
              ></ToAddTaskButton>
            )}
          </PreloaderContainer>
          {tasks.length === 0 && !isCreating && (
            <div
              style={{
                margin: "50px 0px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <TagImage></TagImage>
              <Typography
                variant="subtitle1"
                style={{ margin: "15px 0px 5px 0px" }}
              >
                {`Организуйте свои задачи по ${type}`}
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
                Группируйте задачи по цели или по сфере активности. Перетащите
                задачи, чтобы перегруппировать их или создать подзадачи.
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
                    <Typography
                      style={{ fontSize: "1rem", margin: "0px 10px" }}
                    >
                      {`Как использовать ${type}`}
                    </Typography>
                  </>
                }
                body={
                  <Typography style={{ fontSize: "0.8rem" }}>
                    Разделять рабочие и личные задачи. Создать поэтапный план
                    достижения цели. Сотрудничать с коллегами. Поделиться
                    списком дел с близкими. Записывать, что прочитать или
                    посмотреть
                  </Typography>
                }
              ></ArrowTooltip>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: "100%"
          }}
        >
          <span style={{ width: 400, height: 350 }}>
            <NotFoundImage></NotFoundImage>
          </span>
        </div>
      )}
    </Container>
  );
}
