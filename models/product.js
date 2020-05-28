var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('./../data.sqlite');
let product = { ID: 1, name: 'Lait', price:1500 , quantity:20 , barcode:"string" ,stock:5 ,minimum_stock:3,description:"string" ,photo:"string",expiration_date:"string ",category_id:" string " }
class product_model {
        constructor() {
                this.state = {
                        _stmt: null
                }
        }
        readAll() {
                db.each("select * from product ", (res, err) => {
                        if (err)
                                console.log(err);
                        else
                                console.log(res);
                });
        }
        read(obj) {

                db.get("SELECT * FROM product WHERE ID =" + obj.ID, (res, err) => {
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
                                this.state._stmt = db.prepare("INSERT INTO product (name , price , quantity , barcode ,stock ,minimum_stock,description ,photo,expiration_date,category_id) VALUES (?,?,?,?,?,?,?,?,?,?)");
                                this.state._stmt.run(obj.name, obj.price, obj.quantity, obj.barcode, obj.stock, obj.minimum_stock, obj.description,obj.photo , obj.expiration_date,obj.category_id );
                                this.state._stmt.finalize();
                        })
                }
                catch (err) {
                        console.log("There is an error " + err);
                }
        }
        // update(obj) {
        //         db.serialize(() => {
        //                 this.state._stmt = db.prepare("UPDATE product SET name = CASE WHEN ? != NULL THEN ? END WHERE ID= ? ");// , lastname = CASE WHEN (? = NULL) THEN product.lastname ELSE ? END  , phone= CASE WHEN (? = NULL) THEN product.phone ELSE ? END , password = CASE WHEN (? = NULL) THEN product.password ELSE ? END,mail = CASE WHEN (? = NULL) THEN product.mail ELSE ? END  WHERE ID=? ;");
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
                this.state._stmt = db.prepare("DELETE FROM product WHERE ID=?");
                this.state._stmt.run(obj.ID);
                console.log("supprimer");
        }
}

var milk = new product_model;
//milk.readAll();
//milk.read({ ID: 3});
//milk.create({ name: 'milk', lastname: 'nejolbe', phone: "24-44-78-17", password: 'lapingeant', mail: 'anni@gmail.com', store_id: 3 });
//milk.update();
//milk.update(armel);
//milk.read({ ID: 3});
// milk.readAll();
// milk.delete({ID : 2});
// milk.readAll();
//milk.readAll();
milk.readAll();
milk.update(armel);
milk.readAll();