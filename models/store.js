var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');

let store1 = { id: 1 , name: 'slabyz', mail: 'chicken@gmail.com' };
class store_model {
        constructor() {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from store ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM store WHERE ID =" + obj.id, (res, err) => {
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
                                this.state._stmt = db.prepare("INSERT INTO store (name,mail) VALUES (?,?)");
                                this.state._stmt.run(obj.name , obj.mail);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
        update(obj) {
                db.serialize(() => {
                        this.state._stmt = db.prepare("UPDATE store SET name = CASE WHEN ? != NULL THEN ? END WHERE ID= ? ");// , lastname = CASE WHEN (? = NULL) THEN store.lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN store.phone ELSE ? END , password = CASE WHEN (? = NULL) THEN store.password ELSE ? END,mail = CASE WHEN (? = NULL) THEN store.mail ELSE ? END  WHERE ID=? ;");
                        console.log(obj.name)
                        try {
                        this.state._stmt.run(obj.name, obj.name, obj.id);// obj.lastname, obj.lastname , obj.phone, obj.phone, obj.password, obj.password, obj.mail, obj.mail, obj.ID);
                        }
                        catch (err){
                                console.log(err);
                        }
                        this.state._stmt.finalize();
                        console.log("updated ....");
                })
        }

        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM store WHERE ID=?");
                this.state._stmt.run(obj.id);
                console.log("supprimer");
        }
}
