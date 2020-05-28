var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let armel = { ID: 3, name:'pintade', lastname: 'soupepintade', phone: null, password: 'ca marche', mail: 'pinta@gmail.com' }
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
                        this.state._stmt = db.prepare("UPDATE user SET name = COALESCE(?, name) ,lastname = COALESCE(?, lastname) , phone= COALESCE(?, phone) , password = COALESCE(?, password),mail = COALESCE(?, mail)  WHERE ID=? ;");
                        console.log(obj.name)
                        try {
                        this.state._stmt.run(obj.name, obj.lastname,  obj.phone,  obj.password, obj.mail, obj.ID);
                        }
                        catch (err){
                                console.log(err);
                        }
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
 annie.read({ID:3});
 annie.update(armel);
 annie.read({ID:3});

