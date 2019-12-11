import React from "react";
import { useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ColorBadge from "./ColorBadge";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Link } from "react-router-dom";
import Tag from "./Tag";
function DisplayFavouriteTags(props) {
  const favouriteProjects = useSelector(state =>
    state.tags.projects.filter(p => p.favorite)
  );
  const favouriteMarks = useSelector(state =>
    state.tags.marks.filter(m => m.favorite)
  );
  const favouriteFilters = useSelector(state =>
    state.tags.filters.filter(f => f.favorite)
  );
  const { handleMenuClose, classes, close } = props;
  return (
    <>
      <span onClick={close}>
        {favouriteProjects.map(p => (
          <Tag
            style={{
              padding: "5px",
              margin: "5px 0px 0px 0px",
              maxWidth: "384px"
            }}
            disableDraggable
            item={p}
            taskSelector="projects"
            to={`/проекты/${p.name}?id=${p.id}`}
            tagIcon={item => <ColorBadge color={item.color}></ColorBadge>}
          ></Tag>
        ))}
      </span>
      <span onClick={close}>
        {favouriteMarks.map(m => (
          <Tag
            style={{
              padding: "5px",
              margin: "5px 0px 0px 0px",
              maxWidth: "384px"
            }}
            taskSelector="marks"
            disableDraggable
            item={m}
            to={`/метки/${m.name}?id=${m.id}`}
            tagIcon={item => (
              <LocalOfferIcon
                style={{ color: item.color, margin: "0px 3px 0px 0px" }}
              />
            )}
          ></Tag>
        ))}
      </span>

      {favouriteFilters.map(f => (
        <ListItem
          style={{
            padding: "5px",
            margin: "5px 0px 0px 0px",
            maxWidth: "384px"
          }}
          button
          component={Link}
          onClick={() => handleMenuClose(false)}
          to={f.to}
        >
          <LocalOfferIcon
            style={{ color: f.color, margin: "0px 10px 0px 3px" }}
          />
          <ListItemText
            primary={
              <Typography variant="body1" className={classes.typo}>
                {f.name}
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      ))}
    </>
  );
}

export default DisplayFavouriteTags;
