app.service('$global', function () {

    this.selectedNews = null;

    this.selectedProduct = null;

    this.newOrder = null;
    this.selectedOrder = null;

    this.selectedBill = null;

    this.selectedObj = null;

    this.selectedCustomer = null;

    this.OrderList = null;
    this.OrderList_Start = null;
    this.OrderList_End = null;

    this.EeventList = null;
    this.EeventList_Start = null;
    this.EeventList_End = null;

    this.theVOU_SALE = null;

    this.theCustomer_CUST_NAME = null;
    this.theCustomer_CUST_ID = null;
    this.theSALE_ID = null;
    this.theSALE_NAME = null;

    this.cart = [];

    this.addToCart = function(item){
        if (this.cart == null) {
            this.cart = [];
        }

        // 更新商品購買數量
        for (var i = 0; i < this.cart.length; i++) {
            if( this.cart[i].PROD_ID == item.PROD_ID ){
                this.cart[i].ORD_QTYI = item.ORD_QTYI;
                return;
            }
        }

        this.cart.push(item);
    };

    this.getCart = function () {
        return this.cart;
    };

    this.resetCart = function () {
        this.cart = [];
    };

    this.resetAllProperty = function () {

        this.selectedNews = null;
        this.selectedProduct = null;

        this.newOrder = null;
        this.selectedOrder = null;

        this.selectedBill = null;

        this.selectedObj = null;

        this.selectedCustomer = null;

        this.OrderList = null;
        this.OrderList_Start = null;
        this.OrderList_End = null;

        this.EeventList = null;
        this.EeventList_Start = null;
        this.EeventList_End = null;

        this.theVOU_SALE = null;

        this.theCustomer_CUST_NAME = null;
        this.theCustomer_CUST_ID = null;
        this.theSALE_ID = null;
        this.theSALE_NAME = null;

        this.cart = [];
    
    };

});