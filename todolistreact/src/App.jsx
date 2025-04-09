import { useRef, useState } from "react";
import "./App.css";
import Form from "./component/Form";
import ToDoList from "./component/ToDoList";

function App() {
  const setTask = useRef('');
  const [tasks, setTasks] = useState([]);

  function addTask(e) {
    e.preventDefault()
    if (setTask.current.value === '') {
      alert('Please enter a task');
      return;
    }
    const taskName = setTask.current.value.trim();
    const isDuplicate = tasks.some(
      (task) => task.task.toLowerCase() === taskName.toLowerCase()
    );

    if (isDuplicate) {
      alert('Task already exists!');
      setTask.current.value = '';
      return;
    }
    
    const task = {
      id: Date.now(),
      task: setTask.current.value,
      completed: false
    }
    setTask.current.value = '';
    setTasks([...tasks, task]);
  }

  function setCompleted(id){
    let taskItem = [];

    tasks.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      taskItem.push(item);
    })
    setTasks(taskItem);
  }

  function remove(id){
    if(window.confirm('Inpo?')){
      setTasks(tasks.filter((item)=> item.id != id))
    }
  }


  return (
    <>
      <Form addTask={addTask} setTask={setTask} />
      <ToDoList tasks={tasks} setCompleted={setCompleted} remove={remove} />
      <footer>
        <center>
          <p>©2025 All rights reserved</p>
        </center>
      </footer>
    </>
  );
}

export default App;
