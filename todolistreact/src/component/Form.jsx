import { useState } from 'react';

function Form({ addTask }) {
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = addTask(taskInput);
    if (success) {
      setTaskInput('');
      setError('');
    } else {
      setError(taskInput.trim() ? 'Task already exists!' : 'Please enter a task');
    }
  };

  return (
    <div className="form-wrapper">
      <header>
        <h3>🔰 To-Do List</h3>
      </header>
      <form onSubmit={handleSubmit} className="input-box">
        <label htmlFor="taskInput" className="visually-hidden">
          Add Your Task
        </label>
        <input
          id="taskInput"
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add your task..."
          aria-invalid={!!error}
          aria-describedby={error ? 'error-message' : undefined}
        />
        <button type="submit" aria-label="Add Task">
          Add
        </button>
        {error && (
          <p id="error-message" className="error">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Form;