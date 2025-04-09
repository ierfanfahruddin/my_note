function ToDoListButton(props) {
  return (
    <>
      <span>
        <button>👆</button>
      </span>
      <span>
        <button>👇</button>
      </span>
      <span>
        <button onClick={() => props.remove(props.id)}>🗑️</button>
      </span>
    </>
  );
}

export default ToDoListButton;
