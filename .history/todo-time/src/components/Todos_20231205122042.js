import { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default function Todos() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    const timestamp = new Date().toLocaleString();
    const taskWithTimestamp = { ...newTask, timestamp };
    const updatedTasks = [...tasks, taskWithTimestamp];
    setTasks(updatedTasks);
  }

  function removeTask(item) {
    const updatedTask = tasks.filter(function (task) {
      return task.id !== item.id;
    });

    setTasks(updatedTask);
  }

  function toggleTask(item) {
    const updatedTask = tasks.map(function (task) {
      if (task.id === item.id) {
        const updatedTask = {
          ...task,
          done: !task.done,
          completedTimestamp: task.done ? null : new Date().toLocaleString(),
        };
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(updatedTask);
  }

  function editTask(updatedTask, editMode) {
    if (editMode) {
      const updatedTasks = tasks.map(function (task) {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      });

      setTasks(updatedTasks);
    }
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <Todo
            key={task.id}
            task={task}
            remove={removeTask}
            toggleTask={toggleTask}
            edit={editTask}
          />
        ))}
      </ul>
      <TodoForm addTask={addTask} editTask={editTask} />
    </div>
  );
}
