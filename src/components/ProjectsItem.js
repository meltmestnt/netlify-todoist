import React from "react";
import ExpandedList from "./ExpandedList";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import { createProject } from "./../redux/actions";
import TagAddDialog from "./TagAddDialog";
import ColorBadge from "./ColorBadge";
import useStateList from "./../utils/stateList";
function Projects(props) {
  const { classes } = props;
  const {
    listItems: projectsList,
    dispatch,
    list: projects,
    modal,
    toggleList: toggleProjects,
    openModal: openProjectModal,
    closeModal: closeProjectModal
  } = useStateList(state => state.tags.projects);

  const addProject = pr => {
    if (pr.name.length >= 3 && pr.color) {
      dispatch(createProject(pr));
    }
  };
  return (
    <>
      <ExpandedList
        title="Проекты"
        id="projects"
        classes={classes}
        toggle={projects}
        icon={FormatListBulletedIcon}
        toggleList={toggleProjects}
        fallbackTitle="Нет созданных проектов!"
        subitems={projectsList}
        addSubitem={addProject}
        draggable
        openModal={openProjectModal}
        tagIcon={item => <ColorBadge color={item.color}></ColorBadge>}
      ></ExpandedList>
      <TagAddDialog
        open={modal}
        close={closeProjectModal}
        addProject={addProject}
        title="Проект"
        body="проекта"
      ></TagAddDialog>
    </>
  );
}

export default Projects;
