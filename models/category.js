var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let category1 = { id: 3, name: 'cosmetiques' };

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
                                this.state._stmt = db.prepare("INSERT INTO category (name) VALUES (?)");
                                this.state._stmt.run(obj.name);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
        update(obj) {
                db.serialize(() => {
                         this.state._stmt = db.prepare("UPDATE category SET name =  COALESCE(?, name) WHERE ID= ? ");// , lastname = CASE WHEN (? = NULL) THEN category.lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN category.phone ELSE ? END , password = CASE WHEN (? = NULL) THEN category.password ELSE ? END,mail = CASE WHEN (? = NULL) THEN category.mail ELSE ? END  WHERE ID=? ;");
                         console.log(obj.name)
                         try {;
                         this.state._stmt.run(obj.name ,obj.id); 
                         }
                         catch (err){
                                 console.log(err);
                         }
                         this.state._stmt.finalize();
                         console.log("updated ....");
                })
         }

        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM category WHERE ID=?");
                this.state._stmt.run(obj.id);
                console.log("supprimer");
        }
}
var rayon=new category_model();
rayon.create(category1);
rayon.readAll();