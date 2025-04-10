
function Form(props) {
  return (
      <div className="wrapper">
        <header>
          <h3>🔰 TODOLIST </h3>
        </header>

        <form className="input-box">
          <input type="text" ref={props.setTask} placeholder="Add Your Task" />
          <button type="submit" onClick={props.addTask}>Add Task</button>
        </form>
      </div>
  );
}

export default Form;
