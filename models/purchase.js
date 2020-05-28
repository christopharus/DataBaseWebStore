var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let d=new Date();
console.log(d.toLocaleString());
let _purch = { ID: 3, price:5000,date:d.toLocaleString(),validate:true,discount:0.3,tax:0.03,customer_id:1,user_id:2 }
class purchase_model {
        constructor(data) {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from purchase ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM purchase WHERE ID =" + obj.ID, (res, err) => {
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
                                this.state._stmt = db.prepare("INSERT INTO purchase (price,date,validate,discount,tax,customer_id,user_id) VALUES (?,?,?,?,?,?,?)");
                                this.state._stmt.run(obj.price, obj.date, obj.validate, obj.discount, obj.tax, obj.customer_id,user_id);
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
        // update(obj) {
        //         db.serialize(() => {
        //                 this.state._stmt = db.prepare("UPDATE purchase SET name = CASE WHEN ? != NULL THEN ? END WHERE ID= ? ");// , lastname = CASE WHEN (? = NULL) THEN purchase.lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN purchase.phone ELSE ? END , password = CASE WHEN (? = NULL) THEN purchase.password ELSE ? END,mail = CASE WHEN (? = NULL) THEN purchase.mail ELSE ? END  WHERE ID=? ;");
        //                 console.log(obj.name)
        //                 try {
        //                 this.state._stmt.run(obj.name, obj.name, obj.ID);// obj.lastname, obj.lastname , obj.phone, obj.phone, obj.password, obj.password, obj.mail, obj.mail, obj.ID);
        //                 }
        //                 catch (err){
        //                         console.log(err);
        //                 }
        //                 this.state._stmt.finalize();
        //                 console.log("updated ....");
        //         })
        // }
        delete(obj) {
                this.state._stmt = db.prepare("DELETE FROM purchase WHERE ID=?");
                this.state._stmt.run(obj.ID);
                console.log("supprimer");
        }
}
// var annie = new purchase_model;
// //annie.readAll();
// //annie.read({ ID: 3});
// //annie.create({ name: 'annie', lastname: 'nejolbe', phone: "24-44-78-17", password: 'lapingeant', mail: 'anni@gmail.com', store_id: 3 });
// //annie.update();
// //annie.update(armel);
// //annie.read({ ID: 3});
// // annie.readAll();
// // annie.delete({ID : 2});
// // annie.readAll();
// //annie.readAll();
// annie.readAll();
// annie.update(armel);
// annie.readAll();
