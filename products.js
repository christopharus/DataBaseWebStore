class products {
    _name=[]
    _quantity=[]
    _price=[]
    _taxe=[]
    _img=[]

    constructor(name, quantity, price, taxe, img) {
      this._name = name,
        this._quantity = quantity,
        this._price = price,
        this._taxe = taxe,
        this._img = img
    }
    /**
     * Setting the _name     
     * @param {string}  name 
     * @return {bool}
     */
    set __name(name) {
      this._name = name;
    }
    /**
     * Setting the _quantity
     * @param {number} quantity 
     * @return bool
     */
    set __quantity(quantity) {
      this._quantity = quantity;
    }
    /**
     * Setting the price
     * @param {float} price 
     * @return bool 
     */
    set __price(price) {
      this._price = price;
    }
    /**
     * Setting the taxe
     * @param {float} taxe 
     * @return bool 
     */
    set __taxe(taxe) {
      this._taxe = taxe;
    }
    /**
    * Setting the _img     
    * @param {string}   name
    * @return {bool}
    */
    set __img(img) {
      this._img = img;
    }
  }