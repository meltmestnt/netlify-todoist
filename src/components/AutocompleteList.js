import React from "react";
import TextField from "@material-ui/core/TextField";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
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
    backgroundColor: theme.palette.type === "light" ? "white" : "#282C34"
  },
  listbox: {
    padding: "0px !important",
    backgroundColor: theme.palette.type === "light" ? "white" : "#282C34"
  }
}));
function AutocompleteList(props) {
  const classes = useStyles();
  const {
    anchorEl,
    setAnchorEl,
    pendingValue,
    setPendingValue,
    labels,
    label,
    placeholder,
    tagIcon,
    noLabels
  } = props;
  const open = Boolean(anchorEl);
  console.log(labels, open);
  return (
    
      <Autocomplete
        open
        options={labels}
        multiple={props.singular ? false : true}
        renderOption={(option, { selected }) => {
          return (
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              {selected && (
                <DoneIcon color="primary" className={classes.icon}></DoneIcon>
              )}
              <div
                style={{
                  marginLeft: 10,
                  height: "100%",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {tagIcon && tagIcon(option)}
              </div>
              <p className={classes.text}>{option.name}</p>
              {selected && (
                <CloseIcon
                  style={{ justifySelf: "flex-end" }}
                  className={classes.icon}
                />
              )}
            </div>
          );
        }}
        classes={{
          paper: classes.paper,
          option: classes.option,
          listbox: classes.listbox
        }}
        onClose={() => setAnchorEl(null)}
        onChange={(event, newValue) => {
          setPendingValue(newValue);
        }}
        value={pendingValue}
        disableCloseOnSelect
        noOptionsText={noLabels}
        getOptionLabel={option => option.name}
        renderInput={params => {
          return (
            <TextField
              ref={params.ref}
              inputProps={params.inputProps}
              variant="outlined"
              label={label}
              placeholder={placeholder}
              fullWidth
              autoFocus
            ></TextField>
          );
        }}
      />
   
  );
}

export default AutocompleteList;
