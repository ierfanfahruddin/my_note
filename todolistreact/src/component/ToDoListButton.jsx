import { FaTrash, FaEdit } from 'react-icons/fa';

function ToDoListButton({ remove, edit }) {
  return (
    <div className="button-group">
      <button onClick={edit} aria-label="Edit task">
        <FaEdit />
      </button>
      <button onClick={remove} aria-label="Delete task">
        <FaTrash />
      </button>
    </div>
  );
}

export default ToDoListButton;