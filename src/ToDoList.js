import { useState } from "react";
import './ToDoList.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

const toggleComplete = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id && !task.completed
        ? { ...task, completed: true }
        : task
    )
  );
};

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    const updatedTasks = [...tasks];
    const draggedItem = updatedTasks[dragIndex];

    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(index, 0, draggedItem);

    setTasks(updatedTasks);
    setDragIndex(null);
  };

  return (
    <div className="App-link">
      <h2>SORTABLE To_Do_List</h2>

      <div className="input-row">
        <input
          type="text"
          value={input}
          placeholder="Enter a Task"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="task-item"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
             <span
                className={task.completed ? "completed" : ""}
                onClick={() => toggleComplete(task.id)}
             >
              {task.text}
            </span>
                <button
                className="delete-btn"
                onClick={(e) => {
                 e.stopPropagation();
                 removeTask(task.id);
             }}
             >
             Remove
             </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;