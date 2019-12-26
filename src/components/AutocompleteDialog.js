import React from "react";
import TextField from "@material-ui/core/TextField";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Typography from "@material-ui/core/Typography";
import { Checkbox } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  popper: {
    width: 300,
    fontSize: 13,
    zIndex: 99999,
    color: "#586069",
    borderBottom: "none",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: theme.palette.type === "light" ? "white" : "#282C34",
    margin: "15px 10px"
  },
  text: {
    margin: "7px 10px",
    flexGrow: 1
  },
  icon: {
    width: 18,
    height: 18,
    margin: "0px 10px"
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 0,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent"
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover
    }
  },
  paper: {
    boxShadow: `0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)`,
    margin: 0,
    color: theme.palette.type === "light" ? "#586069" : "white",
    width: `100%`,
    fontSize: 13,
    borderRadius: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    padding: 10,
    backgroundColor: theme.palette.type === "light" ? "white" : "#282C34",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100%",
      padding: "30px 10px !important"
    }
  },
  listbox: {
    padding: "0px !important",
    backgroundColor: theme.palette.type === "light" ? "white" : "#282C34"
  }
}));
function AutocompleteDialog(props) {
  const classes = useStyles();
  const {
    dialog,
    toggleDialog,
    pendingValue,
    setPendingValue,
    labels,
    label,
    singular = false,
    placeholder,
    noLabels,
    apply
  } = props;
  const [list, changeList] = React.useState(labels);
  const [oldPendingValue, changeOldPandingValue] = React.useState(pendingValue);
  React.useEffect(() => changeList(labels), [labels, dialog]);
  const handleChange = (e, p) => {
    if (e.target.checked) {
      setPendingValue([...pendingValue, p]);
    } else {
      setPendingValue(pendingValue.filter(i => i.id !== p.id));
    }
    apply && apply();
  };
  const filterLabels = text => {
    const filteredList =
      text.length > 0
        ? labels.filter(
            i => i.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
          )
        : labels;
    changeList(filteredList);
  };
  const determineIfChecked = o => pendingValue.find(i => i.id === o.id);
  const handleClose = () => {
    setPendingValue(oldPendingValue);
    toggleDialog(false);
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      classes={{ paper: classes.paper }}
      aria-labelledby="confirmation-dialog-title"
      open={dialog}
    >
      {labels.length > 0 ? (
        <>
          <DialogTitle
            style={{ padding: "10px 20px" }}
            id="confirmation-dialog-title"
          >
            {label}
          </DialogTitle>
          <TextField
            style={{ margin: "0px 24px 10px 24px" }}
            placeholder={placeholder}
            label={label}
            onChange={e => filterLabels(e.target.value)}
          ></TextField>
          <DialogContent>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {singular ? (
                <RadioGroup
                  value={pendingValue.id}
                  onChange={e => {
                    setPendingValue(
                      labels.filter(i => i.id === e.target.value)[0]
                    );
                    apply && apply();
                  }}
                >
                  {list.map(option => (
                    <FormControlLabel
                      value={option.id}
                      key={option.id}
                      control={<Radio />}
                      label={option.name}
                    />
                  ))}
                </RadioGroup>
              ) : (
                list.map(option => (
                  <FormControlLabel
                    value={option.id}
                    key={option.id}
                    onChange={e => handleChange(e, option)}
                    control={<Checkbox checked={determineIfChecked(option)} />}
                    label={option.name}
                  />
                ))
              )}
            </div>
          </DialogContent>
        </>
      ) : (
        <DialogContent style={{ padding: "15px 10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <RemoveCircleIcon color="primary"></RemoveCircleIcon>
            <Typography style={{ margin: "0px 10px" }} variant="h6">
              {noLabels}
            </Typography>
          </div>
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={() => toggleDialog(false)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AutocompleteDialog;
