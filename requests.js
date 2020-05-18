var sqlite3=require('sqlite3').verbose();
var db=new sqlite3.Database('./esdras.db',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log('Connected to the database armel');
});

/**
 * Opering statements in the databse 
 * 
 */
db.serialize(() => {
    db.each(`SELECT * from users `, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.one);
    });
  });


 /**
  * Close the database and manage erros too
  */
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });