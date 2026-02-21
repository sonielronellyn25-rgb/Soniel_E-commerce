import { useState } from "react";
import './ToDoList.css';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [draggedTask, setDraggedTask] = useState(null);

    const addTask = () => {
        if (!input.trim()) return alert("Please enter a task!");
        setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
        setInput("");
    };

    const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

    const handleDrop = (e, targetTask) => {
        e.preventDefault();
        if (!draggedTask || draggedTask.id === targetTask.id) return;
        
        const newTasks = [...tasks];
        const dragIdx = tasks.findIndex(t => t.id === draggedTask.id);
        const targetIdx = tasks.findIndex(t => t.id === targetTask.id);
        
        newTasks.splice(dragIdx, 1);
        newTasks.splice(targetIdx, 0, draggedTask);
        setTasks(newTasks);
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">📝 My To-Do List</h1>
            
            <div className="input-section">
                <input
                    type="text"
                    className="task-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Enter a Task"
                />
                <button className="add-button" onClick={addTask}>Add Task</button>
            </div>

            {tasks.length === 0 ? (
                <p className="empty-message">No tasks yet. Add one above!</p>
            ) : (
                <>
                    <p className="drag-hint">💡 Tip: Drag tasks to reorder them</p>
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li 
                                key={task.id} 
                                className={`task-item ${task.completed ? 'completed' : ''}`}
                                draggable="true"
                                onDragStart={(e) => {
                                    setDraggedTask(task);
                                    e.dataTransfer.effectAllowed = 'move';
                                    e.currentTarget.style.opacity = '0.4';
                                }}
                                onDragEnd={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                    setDraggedTask(null);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'move';
                                }}
                                onDrop={(e) => handleDrop(e, task)}
                                onDragEnter={(e) => e.currentTarget.style.borderTop = '3px solid #4CAF50'}
                                onDragLeave={(e) => e.currentTarget.style.borderTop = ''}
                            >
                                <div className="drag-handle">⋮⋮</div>
                                <div className="task-content">
                                    <input
                                        type="checkbox"
                                        className="task-checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <span className="task-text" onClick={() => toggleTask(task.id)}>
                                        {task.text}
                                    </span>
                                </div>
                                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {tasks.length > 0 && (
                <div className="task-summary">
                    <p>Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
                </div>
            )}
        </div>
    );
}

export default ToDoList;