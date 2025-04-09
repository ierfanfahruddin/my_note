import ToDoListButton from "./ToDoListButton";

function ToDoList(props) {
  props.tasks.sort((a, b) => {
    if (a.completed === b.completed) {
      return a.task.localeCompare(b.task);
    }
    return a.completed ? 1 : -1;
  });
  return (
    <div className="wrapper">
      <ul>
        {
          props.tasks.map((task) => {
            return (
              <li key={task.id}>
                <div className="left">
                  <button onClick={() => props.setCompleted(task.id)}>{task.completed ? '✅' : '◻️'}</button>
                </div>
                <div className="center">{task.task}</div>
                <div className="right">
                  <ToDoListButton remove={props.remove} id={task.id} />
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ToDoList;
