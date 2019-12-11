export const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота"
];

export const monthes = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

export const getToday = () => {
  return getDay(new Date());
};

export const getDateFromParams = ({ monthName, date, weekDay }) => {
  const month = monthes.findIndex(month => month === monthName);
  const dateExample = new Date();
  return new Date(dateExample.getFullYear(), month, date);
};

export const getTomorrowDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
};

export const getTomorrow = () => {
  const date = new Date();
  return getDay(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  );
};

export const getWeek = () => {
  const weekDays = [];
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      getDay(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i))
    );
  }
  return weekDays;
};

const getDay = date => {
  const weekDay = date.getDay(),
    month = date.getMonth();
  return {
    weekDay: days[weekDay],
    date: date.getDate(),
    monthName: monthes[month],
    getTime: date.getTime()
  };
};
