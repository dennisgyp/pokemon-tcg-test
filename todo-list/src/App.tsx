import React, { useState } from "react";
import "./App.css";



type Task = {
  id: number;
  description: string;
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<string>("");
  const [previousTasks, setPreviousTasks] = useState<Task[][]>([]);
  const [nextTasks, setNextTasks] = useState<Task[][]>([]);

  const handleAddTask = () => {
    if (currentTask.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      description: currentTask,
    };
    setTasks([...tasks, newTask]);
    setPreviousTasks([...previousTasks, tasks]);
    setCurrentTask("");
    setNextTasks([]);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setPreviousTasks([...previousTasks, tasks]);
    setNextTasks([]);
  };

  const handleUndo = () => {
    if (previousTasks.length === 0) return;
    const newCurrentTasks = previousTasks[previousTasks.length - 1];
    const newPreviousTasks = previousTasks.slice(0, -1);
    setTasks(newCurrentTasks);
    setCurrentTask("");
    setPreviousTasks(newPreviousTasks);
    setNextTasks([...nextTasks, tasks]);
  };

  const handleRedo = () => {
    if (nextTasks.length === 0) return;
    const newCurrentTasks = nextTasks[nextTasks.length - 1];
    const newNextTasks = nextTasks.slice(0, -1);
    setTasks(newCurrentTasks);
    setPreviousTasks([...previousTasks, tasks]);
    setNextTasks(newNextTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
      />
      <button disabled={currentTask.trim() === ""} onClick={handleAddTask}>
        Add Task
      </button>
     
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button disabled={previousTasks.length === 0} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={nextTasks.length === 0} onClick={handleRedo}>
        Redo
      </button>
    </div>
  );
};

export default TodoList;



