var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let day=new Date();
let armel = { id: 1,date:day.toLocaleString(),product_id:1,user_id:1}

class record_model {
        constructor() {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from record ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM record WHERE ID =" + obj.ID, (res, err) => {
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
                                this.state._stmt = db.prepare("INSERT INTO record (date,product_id,user_id) VALUES (?,?,?)");
                                this.state._stmt.run(obj.date,obj.product_id,obj.user_id);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
         update(obj) {
                db.serialize(() => {
                         this.state._stmt = db.prepare("UPDATE record SET date = COALESCE(?, date),product_id = COALESCE(?, product_id ) ,user_id = COALESCE(?, user_id) WHERE ID= ? ");// , lastname = CASE WHEN (? = NULL) THEN record.lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN record.phone ELSE ? END , password = CASE WHEN (? = NULL) THEN record.password ELSE ? END,mail = CASE WHEN (? = NULL) THEN record.mail ELSE ? END  WHERE ID=? ;");
                         console.log(obj.name)
                         try {
                         this.state._stmt.run(obj.date, obj.name, obj.ID);// obj.lastname, obj.lastname , obj.phone, obj.phone, obj.password, obj.password, obj.mail, obj.mail, obj.ID);
                         }
                         catch (err){
                                console.log(err);
                         }
                         this.state._stmt.finalize();
                         console.log("updated ....");
                 })
         }

        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM record WHERE ID=?");
                this.state._stmt.run(obj.ID);
                console.log("supprimer");
        }
}
var rec=new record_model();
rec.create(armel);
rec.readAll();
