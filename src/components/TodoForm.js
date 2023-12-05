import { useState } from "react";
import { nanoid } from "nanoid";

export default function TodoForm(props) {
  const [showInput, setShowInput] = useState(false);
  const [buttonText, setButtonText] = useState("ADD TASK");
  const [task, setTask] = useState("");

  function handleTaskChange(e) {
    setTask(e.target.value);
  }

  function handleAddTaskClick() {
    if (showInput) {
      const newTask = {
        title: task,
        id: nanoid()
      };
      props.addTask(newTask);
      setTask("");
    }
    setShowInput(!showInput);
    setButtonText(showInput ? "ADD TASK" : "ADD");
  }

  return (
    <div>
      <form className="form">
        <label>
          {showInput && (
            <input
              type="text"
              onChange={handleTaskChange}
              value={task}
              placeholder="Add new task..."
            />
          )}
        </label>
        <button className="btn" type="button" onClick={handleAddTaskClick}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}
