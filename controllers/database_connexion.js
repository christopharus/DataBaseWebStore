
var sqlite3 = require("sqlite3").verbose();

function connect_database(db ,dbname){
    
     db = new sqlite3.Database('./../data.sqlite');
}