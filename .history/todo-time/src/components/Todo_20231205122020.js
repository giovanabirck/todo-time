import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.svg";
import React, { useState } from "react";

export default function Todo(props) {
  const { task } = props;
  const { timestamp, completedTimestamp } = task;
  const timeOnly = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const completedTime = completedTimestamp
    ? new Date(completedTimestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title || "");

  function handleDelete() {
    props.remove(task);
  }

  function handleStatusChange() {
    props.toggleTask(task);
  }

  function handleEditClick() {
    setEditing(true);
  }

  function handleEditInputChange(e) {
    setEditedTitle(e.target.value);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    props.edit(task, editedTitle);
    setEditing(false);
  }

  return (
    <li className="task">
      <div className="task-details">
        <div className="left-side">
          <input
            type="checkbox"
            onChange={handleStatusChange}
            value={task.done}
          />
          {editing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => handleEditInputChange(e)}
              />
              <button onClick={handleEditSubmit}>Edit</button>
            </div>
          ) : (
            <p>{task.done === true ? <del>{task.title}</del> : task.title}</p>
          )}
          <span className="task_name">{task.artist}</span>
          <p className="time">{`Started at ${timeOnly}`}</p>
          {task.done && (
            <p className="time">{`Completed at: ${completedTime}`}</p>
          )}
        </div>

        <div className="right-side">
          {!editing && (
            <form>
              <img src={editIcon} alt="edit icon" onClick={handleEditClick} />
            </form>
          )}
          <img src={deleteIcon} alt="delete icon" onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
