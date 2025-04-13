import { useState, useCallback } from 'react';
import './App.css';
import Form from './component/Form';
import ToDoList from './component/ToDoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // 'name' atau 'completed'

  const addTask = useCallback((taskName) => {
    const trimmedTask = taskName.trim();
    if (!trimmedTask) return false;

    const isDuplicate = tasks.some(
      (task) => task.task.toLowerCase() === trimmedTask.toLowerCase()
    );
    if (isDuplicate) return false;

    const newTask = {
      id: crypto.randomUUID(), // Lebih aman daripada Date.now()
      task: trimmedTask,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    return true;
  }, [tasks]);

  const toggleCompleted = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const editTask = useCallback((id, newTaskName) => {
    const trimmedTask = newTaskName.trim();
    if (!trimmedTask) return false;

    const isDuplicate = tasks.some(
      (task) => task.id !== id && task.task.toLowerCase() === trimmedTask.toLowerCase()
    );
    if (isDuplicate) return false;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, task: trimmedTask } : task
      )
    );
    return true;
  }, [tasks]);

  return (
    <div className="app-container">
      <Form addTask={addTask} />
      <ToDoList
        tasks={tasks}
        sortBy={sortBy}
        setSortBy={setSortBy}
        toggleCompleted={toggleCompleted}
        removeTask={removeTask}
        editTask={editTask}
      />
      <footer>
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;