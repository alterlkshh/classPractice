import { useEffect, useState } from 'react';
import './App.css'

function useTodos(){
  const [todos, setTodo] = useState([]);

  console.log("render")

  useEffect(() => {
    fetch("http://localhost:3000/todos",{
      method: "GET"
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTodo(data);
      })
    })

    setInterval(() => {
      fetch("http://localhost:3000/todos",{
        method: "GET"
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setTodo(data);
        })
      })
    }, 1000)
  }, [])

  return todos;
}

function App() {

  const todos = useTodos();

  return (
    <div>
      <h1>My first react project</h1>
      {todos.map(todo => {
        return <div>
          {todo.id}
          {todo.title}
          {todo.description}
          <button onClick={() => {
            fetch("http://localhost:3000/todos/:id",{
              "method": "DELETE"
            })
          }}>Delete</button>
          <br />
        </div>
      })}
    </div>
  )
}

export default App
