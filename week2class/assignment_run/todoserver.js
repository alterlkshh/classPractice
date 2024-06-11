const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


let todos = [];

// Function to find the index of an object with a given id in an array
function findIndex(array, id) {
    return array.findIndex(item => item.id === id);
}

function removeAtIndex(arr,index){
    let newarray = [];
    for(let i=0; i < arr.length; i++){
        if(i !== index) newarray.push(arr[i]);
    }
    return newarray;
}

// Function to remove an element at the given index from an array
// function removeAtIndex(array, index) {
//     if (index < 0 || index >= array.length) {
//       // Invalid index, return the original array
//       return array;
//     }
//     // Use Array.splice() to remove the element at the given index
//     array.splice(index, 1);
  
//     return array;
// }
  

app.get('/todos', (req,res) => {
    res.json(todos);
});

app.get('/todos/:id', (req,res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id))
  if(todoIndex === -1){
    res.status(404).send();
  } else {
    res.status(200).json(todos[todoIndex]);
  }
})

app.post('/todos', (req, res) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100000),
      title: req.body.title,
      description: req.body.description,
    };
  
    console.log('Received data:', req.body); // Log the received data
    console.log('New todo:', newTodo); // Log the new todo before adding to the array
  
    todos.push(newTodo);
    console.log('Updated todos array:', todos); // Log the updated todos array
  
    res.status(201).json(newTodo);
});
  
  
app.delete('/todos/:id', (req,res) => {
    const todoIndex = findIndex(todos, parseInt(req.params.id))
    if(todoIndex === -1){
      res.status(404).send();
    } else {
      todos = removeAtIndex(todos, todoIndex);
      res.status(200).send();
    }
  })

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});