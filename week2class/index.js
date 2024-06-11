
const fs = require("fs");
function callbackFn(err,data){
    console.log(data);
}

fs.readFile("a.txt","utf-8",callbackFn)

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

// function middleware1(req,res,next){
//     console.log("from inside middlewares" + req.headers.counter);
//     next(); 
// };

// app.use(middleware1);

app.use(bodyParser.json());

function calculateSum(counter){
    var sum = 0;
    for(var i=0; i<=counter; i++){
        sum = sum + i;
    }
    return sum;
}

function calculateMul(counter){
    var mul = 1;
    for(var i=1; i<=counter; i++){
        mul = mul * i;
    }
    return mul;
}

function handlefirstrequest(req,res){
    // console.log(req.headers);
    var counter = req.query.counter;
    // var counter = req.headers.counter;
    // var counter = req.body.counter;
    console.log(req.body)
    if(counter < 10000){
        var calculatedSum = calculateSum(counter);
        var calculatedMul = calculateMul(counter);
        var answerobject = {
            sum : calculatedSum,
            mul : calculatedMul
        }
        // var answer = "the sum is " + calculatedSum;
        // res.send(answer);

        res.send(answerobject);
    } else {
        res.status(411).send("you have given a very big number")
    }
}

function givePage(req,res){
    res.sendFile(__dirname + '/index.html')
    
}

app.get('/response', givePage);

app.get('/handlesum', handlefirstrequest);


app.get('/', (req,res) => {
    res.send("studying backend ..")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// console.log(calculatedSum);