import React from "react";
import "date-fns";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker as Picker
} from "@material-ui/pickers";
function DatePicker({ date, setDate, outlined = false }) {
  const handleDateChange = date => {
    setDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <Picker
        label="Выберите дату"
        cancelLabel="отмена"
        inputVariant={outlined ? "outlined" : "standard"}
        value={date}
        onChange={handleDateChange}
        invalidLabel="Неверная дата!"
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
