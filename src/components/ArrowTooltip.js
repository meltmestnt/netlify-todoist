import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  tooltip: {
    position: "relative"
  },
  arrow: {
    position: "absolute",
    fontSize: 6,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  popper: arrowGenerator(theme.palette.grey[700])
}));

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "2em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "2em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}
function ArrowTooltip(props) {
  const [tooltip, setTooltip] = React.useState(null);
  const { title, body, button } = props;
  const { arrow, ...classes } = useStyles();
  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(tooltip),
              element: tooltip
            }
          }
        }
      }}
      {...props}
      title={
        <React.Fragment>
          <Container
            style={{
              display: "flex",
              padding: "10px",
              alignItems: "center"
            }}
          >
            {typeof title === "string" ? (
              <Typography variant="subtitle2">{title}</Typography>
            ) : (
              title
            )}
          </Container>
          {body && <Container style={{ padding: "10px" }}>{body}</Container>}
          <span className={arrow} ref={setTooltip} />
        </React.Fragment>
      }
    >
      {button}
    </Tooltip>
  );
}

export default ArrowTooltip;
