import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa"
import { MdCancel, MdDone } from "react-icons/md"
import { IoIosSave } from "react-icons/io"
import "../styles/TodoList.css";
import { addTask, toggleTask, deleteTask, getTasks, editTask, saveEditedTasks, cancelEdit } from "../services/taskService"
import { TodoTask } from "../../types/TodoTask";

export default function TodoList() {
    const [tasks, setTasks] = useState<TodoTask[]>(getTasks());
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedText, setEditedText] = useState("");
  
    const handleAddTask = () => {
      setTasks((prevTasks) => addTask(prevTasks, newTask));
      setNewTask("");
    };

    const handleToggleTask = (id: number) => {
      setTasks((prevTasks) => toggleTask(prevTasks, id));
    };

    const handleDeleteTask = (id: number) => {
      setTasks((prevTasks) => deleteTask(prevTasks, id));
    };

    const handleStartEdit = (id: number, currentText: string) => {
      setEditingId(id);
      setEditedText(currentText);
    }

    const handleSaveEdit = (id: number, newText: string) => {
      setTasks((prevTasks) => {
        const updatedTasks = editTask(prevTasks, id, newText);
        saveEditedTasks(updatedTasks);
        return updatedTasks;
      });
      setEditingId(null);
    };

    const handleCancelEdit = () => {
      setTasks(() => cancelEdit());
      setEditingId(null);
      setEditedText("");
    }
  
    
    return (
      <div className="todo-list">
        <h1>To-Do List</h1>
        <div className="row">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-button" onClick={handleAddTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editingId === task.id ? (
                <>
                  <input className="col1" type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                  <button className="col3" onClick={() => handleSaveEdit(task.id, editedText)}><IoIosSave /></button>
                  <button className="col4" onClick={() => handleCancelEdit()}><MdCancel /></button>
                  </>
              ) : (
                <>
                <span className="col1" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.task_description}
                </span>
                <div className="checkbox-container col2">
                  <input className="custom-checkbox" id="checkbox" type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)}/>
                  <label htmlFor="custom-checkbox">Completed</label>
                </div>
                <button className="col3" onClick={() => handleStartEdit(task.id, task.task_description)}><FaEdit /></button>
                <button className="col4" onClick={() => handleDeleteTask(task.id)}><FaTrashAlt /></button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }