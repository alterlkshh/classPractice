const fs = require("fs")


// function callback(err,data){
//     console.log(data);
// }

// fs.readFile("a.txt","utf-8",callback);

fs.readFile("a.txt","utf-8",(err,data) => {
    console.log(data);
})


app.get("/todos",(req,res) => {
    res.json()
})