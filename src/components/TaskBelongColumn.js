import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useTaskWhichTag } from "./../utils/taskFilter";
import Button from "@material-ui/core/Button";
import ColorBadge from "./ColorBadge";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
function TaskBelongColumn({ task, close }) {
  const tags = useTaskWhichTag(task);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
      }}
    >
      <div style={{ flexGrow: 1 }}>
        {tags.map(tag => (
          <Button
            style={{
              marginRight: "10px",
              textTransform: "capitalize",
              padding: 5
            }}
          >
            {tag && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {tag.type === "project" ? (
                  <ColorBadge color={tag.color}></ColorBadge>
                ) : (
                  <LocalOfferIcon
                    style={{ color: tag.color, margin: "0px 3px 0px 0px" }}
                  />
                )}
                <p style={{ margin: "0px", marginLeft: "5px" }}>
                  {tag ? tag.name : ""}
                </p>
              </div>
            )}
          </Button>
        ))}
      </div>

      <Button onClick={close} style={{ justifySelf: "end" }}>
        <CloseIcon style={{ cursor: "pointer" }}></CloseIcon>
      </Button>
    </div>
  );
}

export default TaskBelongColumn;
