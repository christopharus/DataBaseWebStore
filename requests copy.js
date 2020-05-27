
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database');
});
var data;
  function request (req) {
    return new Promise(function (resolve, reject) {
        var doto=[];
        db.each(req, function (err, row) {
            if (err)
                reject(err);
            else
                resolve(row);
        }, function (err, n) {
            if (err) {
                reject(err);
            }
            else
                resolve(n);
        });
    });
}
var mydata;
async function makerequest(){
 mydata = await request("select * from user "); 
}
makerequest();
console.log(mydata);

//console.log(data);

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection');
});