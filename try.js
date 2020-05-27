const fs = require('fs');
// First I want to read the file
function readf(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,function (err,file){
            if(err)
                console.log(err);
            else    
                console.log(file);
        });
});
}

readf("./index.html").then(function (response){
    console.log(response);
}).catch((err)=>{console.log(err)});