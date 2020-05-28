var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let category1 = { id: 3, name: 'anita', lastname: 'soup', phone: '60-58-22-12', password: null , mail: 'chicken@gmail.com' }

class category_model {
        constructor(data) {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from category ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM category WHERE ID =" + obj.id, (res, err) => {
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
                                this.state._stmt = db.prepare("INSERT INTO category (name ,lastname,phone,password,mail,store_id) VALUES (?,?,?,?,?,?)");
                                this.state._stmt.run(obj.name, obj.lastname, obj.phone, obj.password, obj.mail, obj.store_id);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
        // update(obj) {
        //         db.serialize(() => {
        //                 this.state._stmt = db.prepare("UPDATE category SET name = CASE WHEN ? != NULL THEN ? END WHERE ID= ? ");// , lastname = CASE WHEN (? = NULL) THEN category.lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN category.phone ELSE ? END , password = CASE WHEN (? = NULL) THEN category.password ELSE ? END,mail = CASE WHEN (? = NULL) THEN category.mail ELSE ? END  WHERE ID=? ;");
        //                 console.log(obj.name)
        //                 try {
        //                 this.state._stmt.run(obj.name, obj.name, obj.id;// obj.lastname, obj.lastname , obj.phone, obj.phone, obj.password, obj.password, obj.mail, obj.mail, obj.ID);
        //                 }
        //                 catch (err){
        //                         console.log(err);
        //                 }
        //                 this.state._stmt.finalize();
        //                 console.log("updated ....");
        //         })
        // }

        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM category WHERE ID=?");
                this.state._stmt.run(obj.id);
                console.log("supprimer");
        }
}
