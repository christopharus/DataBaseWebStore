var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let armel = { ID: 3, name: null, lastname: 'soup', phone: '60-58-22-12', password: null , mail: 'chicken@gmail.com' }
class user_model {
        constructor(data) {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from user ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM user WHERE ID =" + obj.ID, (res, err) => {
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
                                this.state._stmt = db.prepare("INSERT INTO user (name ,lastname,phone,password,mail,store_id) VALUES (?,?,?,?,?,?)");
                                this.state._stmt.run(obj.name, obj.lastname, obj.phone, obj.password, obj.mail, obj.store_id);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
        update(obj) {
                db.serialize(() => {
                        this.state._stmt = db.prepare("UPDATE user SET name = CASE WHEN (? = NULL) THEN name ELSE ? END , lastname = CASE WHEN (? = NULL) THEN lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN phone ELSE ? END , password = CASE WHEN (? = NULL) THEN password ELSE ? END,mail = CASE WHEN (? = NULL) THEN mail ELSE ? END  WHERE ID=? ;");
                        this.state._stmt.run(obj.name, obj.name, obj.lastname, obj.lastname , obj.phone, obj.phone, obj.password, obj.password, obj.mail, obj.mail, obj.ID);
                        
                        this.state._stmt.finalize();
                        console.log("updated ....");
                })
        }

        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM user WHERE ID=?");
                this.state._stmt.run(obj.ID);
                console.log("supprimer");
        }
}
var annie = new user_model;
//annie.readAll();
//annie.read({ ID: 3});
//annie.create({ name: 'annie', lastname: 'nejolbe', phone: "24-44-78-17", password: 'lapingeant', mail: 'anni@gmail.com', store_id: 3 });
//annie.update();
//annie.update(armel);
//annie.read({ ID: 3});
// annie.readAll();
// annie.delete({ID : 2});
// annie.readAll();
//annie.readAll();
annie.update(armel);
annie.readAll();
