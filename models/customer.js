var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let client = { id: 1, name: 'sidnooma',phone:"41-14-24-11",photo:"string",mail:"anita@gmail.com",mark:"other"}
class customer_model {
        constructor(data) {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from customer ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM customer WHERE ID =" + obj.ID, (res, err) => {
                        if (err)
                                console.log(err);
                        else if (res !== null)
                                console.log(res);
                        else
                                console.log()
                });
        }
        create(obj) {
                try {
                        db.serialize(() => {
                                this.state._stmt = db.prepare("INSERT INTO customer (name ,phone,photo,mail,mark) VALUES (?,?,?,?,?)");
                                this.state._stmt.run(obj.name, obj.phone, obj.photo, obj.mail, obj.mark);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
         update(obj) {
                 db.serialize(() => {
                         this.state._stmt = db.prepare("UPDATE customer SET name = COALESCE(?, name), phone=COALESCE(?,phone), photo=COALESCE(?, photo ), mail=COALESCE(?, mail),mark=COALESCE(?, mark) WHERE ID= ? ");//  
                         console.log(obj.name)
                         try {
                         this.state._stmt.run(obj.name, obj.phone, obj.photo, obj.mail, obj.mark,obj.id); ;
                         }
                         catch (err){
                                 console.log(err);
                         }
                         this.state._stmt.finalize();
                         console.log("updated ....");
                 })
         }

        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM customer WHERE ID=?");
                this.state._stmt.run(obj.ID);
                console.log("supprimer");
        }
}
var patrick=new customer_model();
patrick.update(client);
patrick.readAll();