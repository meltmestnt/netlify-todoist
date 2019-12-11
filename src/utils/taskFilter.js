import React from "react";
import { useSelector } from "react-redux";

export const useTagControls = tag => {
  const [marks, setMarks] = React.useState(
    tag && tag.type === "mark" ? [tag] : []
  );
  const [priority, setPriority] = React.useState([]);
  const [projects, setProject] = React.useState(
    tag && tag.type === "project" ? [tag] : []
  );
  return {
    marks: [marks, setMarks],
    projects: [projects, setProject],
    priority: [priority, setPriority]
  };
};

export default taskIds => {
  const tasks = useSelector(state => state.tasks.tasks);
  return taskIds.map(id => tasks.filter(t => t.id === id)[0] || null);
};
export const useTaskWhichTag = task => {
  const tags = useSelector(state => state.tags);
  let tagsSelected = [];
  Object.keys(tags).forEach(t => {
    tags[t].forEach(i => {
      if (i.taskIds.includes(task.id)) {
        tagsSelected.push(i);
      }
    });
  });
  return tagsSelected;
};
export const useDetermineColumn = date => {
  const columns = useSelector(state => state.tasks.columns);
  if (!date) return null;
  const column =
    Object.values(columns).find(col => {
      return col.date ? col.date.getTime() === date.getTime() : true;
    }) || null;

  return column.id;
};
export const useDetermineTag = (id, selector) => {
  const tags = useSelector(state => state.tags);
  let tag = null;
  Object.keys(tags).forEach(k => {
    tags[k].forEach(i => {
      if (i.id === id) {
        tag = i;
      }
    });
  });
  return tag;
};
export const useTagTasks = (item, selector) => {
  const tasks = useSelector(state => state.tasks.tasks);

  return item
    ? item.taskIds.map(id => tasks.filter(t => t.id === id)[0] || null)
    : null;
  /* return tasks.filter(t => {
    if (t.projects.find(i => i === item)) return true;
    else if (t.marks.find(i => i === item)) return true;
  }); */
};
export const useTasksCount = (date = new Date(), weekTasks = false) => {
  const tasks = useSelector(state =>
    state.tasks.tasks.filter(t =>
      weekTasks
        ? new Date(t.date).getDate() <= new Date(date).getDate() &&
          new Date(t.date).getDate() >= new Date().getDate()
        : new Date(t.date).getDate() === new Date(date).getDate()
    )
  );
  return tasks;
};
