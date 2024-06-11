const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const path = require("path");
const cors = require("cors")

app.use(bodyParser.json());
app.use(cors());

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

app.get('/todos',(req,res) => {
    fs.readFile("todos.json","utf-8",(err,data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/todos",(req,res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 100000),
        title: req.body.title,
        description: req.body.description,
      };

      fs.readFile("todos.json","utf-8",(err,data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);

        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if(err) throw err;
            res.status(201).json(newTodo)
        })
        
    });
})

app.delete('/todos/:id', (req, res) => {

    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) throw err;
      var todos = JSON.parse(data);
      const todoIndex = findIndex(todos, parseInt(req.params.id));
      if (todoIndex === -1) {
        res.status(404).send();
      } else {
        todos = removeAtIndex(todos, todoIndex);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) throw err;
          res.status(200).send();
        });
      }
    });
  });

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});