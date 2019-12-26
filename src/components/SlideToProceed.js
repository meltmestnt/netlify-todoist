import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated, interpolate, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DoneIcon from "@material-ui/icons/Done";
import { useHistory } from "react-router-dom";
import { setAuth, ifAuthenticated } from "./../utils/localStorage";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  mainPool: {
    boxShadow: `0px 0px 30px -3px rgba(211,211,211,0.8)`,
    width: 320,
    height: 60,
    borderRadius: 20,
    background: "white",
    position: "relative",
    overflow: "hidden"
  },
  icon: {
    width: 15,
    height: 15,
    position: "absolute",
    color: "white",
    top: `50%`,
    left: "50%",
    transform: `translate(-50%,-50%)`
  },
  typo: {
    fontSize: "1rem",
    position: "absolute",
    top: "50%",
    left: "25%",
    margin: 0,
    zIndex: 0,
    cursor: "default",
    transition: "0.3s",
    transform: "translateY(-50%)",
    userSelect: "none"
  }
}));

function SlideToProceed(props) {
  const history = useHistory();
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(ifAuthenticated());
  const [{ x }, set] = useSpring(() => ({
    x: completed ? 250 : 0,
    config: config.stiff
  }));
  const bind = useDrag(({ down, offset: [x], movement: [mx] }) => {
    console.log("offset:", x, `movement:`, mx);
    if (mx > 230) {
      setCompleted(true);
      setAuth();
      set({ x: 250 });
    } else if (!completed) set({ x: down ? mx : 0 });
  });
  React.useEffect(() => {
    if (completed) {
      setTimeout(() => history.replace("/сегодня"), 1000);
    }
  }, [completed, history]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <div
        style={{
          margin: "80px 0px 50px 0px",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <animated.div
          style={{ background: completed && "#ff5f6d" }}
          className={classes.mainPool}
        >
          <animated.div
            {...bind()}
            style={{
              transform: interpolate([x], x => `translate3d(${x}px, -50%, 0)`),
              borderRadius: "50%",
              background: `linear-gradient(to right, #ff5f6d, #ffc371)`,
              width: 45,
              height: 45,
              position: "absolute",
              top: "50%",
              left: "3%",
              zIndex: 9999,
              cursor: "pointer",
              border: `1px solid white`,
              boxShadow: interpolate([x], x => {
                console.log(x);
                return `${-x * 1.3}px 0px ${
                  x > 230 ? 500 : x > 1 ? x * 2 : 0
                }px ${x > 230 ? 500 : x > 1 ? x : 0}px ${
                  x > 1 ? "#ff5f6d" : "transparent"
                }`;
              })
            }}
          >
            {completed ? (
              <DoneIcon className={classes.icon}></DoneIcon>
            ) : (
              <ChevronRightIcon className={classes.icon}></ChevronRightIcon>
            )}
          </animated.div>
          <p
            className={classes.typo}
            style={{
              color: completed ? "white" : "lightgrey",
              left: completed && "5%",
              zIndex: completed && 9999
            }}
          >
            {completed
              ? `Перемещаем Вас к системе!`
              : `Проведите чтобы продолжить.`}
          </p>
        </animated.div>
      </div>
      <Typography
        style={{ margin: "10px 0px" }}
        color="primary"
        variant="subtitle1"
      >
        {completed
          ? "Вы успешно авторизованы!"
          : "Вы не авторизованы, проведите вправо чтобы авторизоваться!"}
      </Typography>
    </div>
  );
}

export default SlideToProceed;
