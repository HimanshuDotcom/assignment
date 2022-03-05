import React, { Component } from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import { addTodo, getTodos } from './calls';


export function App() {
  const [task, setTask] = useState('');
  const[tasks, setTasks] = useState([]);

  const update= () => {
    getTodos()
    .then(res => {
      setTasks(res['items']);
    })
    .catch(err => {
      alert(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(task.length === 0) {
      alert('Please enter a task');
      return;
    }
    addTodo(task);  // new Task added
    update(); // update the UI
    setTask(''); // set input value to empty string
  }

  useEffect(() => {
   update(); // update the UI (show tasks)
  },[])

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <ul>
          {
            tasks.length ? 
              tasks.map(el => <li key = {el['id']}>{el['name']}</li>)
              :
              "NO TASKS"
          }
        </ul>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input 
              type="text" 
              name = "todo"
              value = {task}
              onChange = {(e) => setTask(e.target.value)}
              />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button type = "submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
