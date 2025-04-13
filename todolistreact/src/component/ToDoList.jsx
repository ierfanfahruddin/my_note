import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToDoListButton from './ToDoListButton';

function ToDoList({ tasks, sortBy, setSortBy, toggleCompleted, removeTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'completed') {
        if (a.completed === b.completed) {
          return a.task.localeCompare(b.task);
        }
        return a.completed ? 1 : -1;
      }
      return a.task.localeCompare(b.task);
    });
  }, [tasks, sortBy]);

  const handleEditStart = (task) => {
    setEditingId(task.id);
    setEditValue(task.task);
  };

  const handleEditSubmit = (id) => {
    const success = editTask(id, editValue);
    if (success) {
      setEditingId(null);
      setEditValue('');
    }
  };

  return (
    <div className="list-wrapper">
      <div className="sort-controls">
        <label htmlFor="sortBy">Sort by: </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul>
        <AnimatePresence>
          {sortedTasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="left">
                <button
                  onClick={() => toggleCompleted(task.id)}
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {task.completed ? '✅' : '◻️'}
                </button>
              </div>
              <div className={`center ${task.completed ? 'strike' : ''}`}>
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleEditSubmit(task.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(task.id)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleEditStart(task)}>{task.task}</span>
                )}
              </div>
              <div className="right">
                <ToDoListButton
                  remove={() => removeTask(task.id)}
                  edit={() => handleEditStart(task)}
                />
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default ToDoList;