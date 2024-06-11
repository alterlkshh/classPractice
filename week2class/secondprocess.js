
function logResponseBody(jsonbody){
    console.log(jsonbody);
}

function callbackFn(result){
    result.json().then(logResponseBody);
}

var sendObj = {
    method: "GET"
};

fetch("http://localhost:3000/handlesum?counter=4",sendObj).then(callbackFn)