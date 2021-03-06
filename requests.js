
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database');
});

  function request (req) {
     return new Promise(function (resolve, reject) {
        let data=[];
        db.each(req, function (err, row) {
            if (err)
                reject(err);
            else
                data.push(row);
        }, function (err, n) {
            if (err) {
                reject(err);
            }
            else
                resolve(data);
        });
    });
}

request("select * from user ")
    .then( (response) =>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })



db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection');
});