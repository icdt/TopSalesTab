app.factory('OrdersFactory', ['$http', 'UrlHelper',function ($http, UrlHelper) {
    
    return{
        // checklist, select選項
        allLocationOptions: [{}, {}, {}],


                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/Orders');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Orders/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/Orders?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/Orders?start=' + ppStart + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByDateIntervalAndCustomer: function (ppStart, ppEnd, ppCname) {
            if (ppCname == null || typeof ppCname == 'undefined') {
                ppCname = '';
            }
            var url = UrlHelper.prepareUrl('api/Orders?start=' + ppStart + '&end=' + ppEnd + "&cname=" + ppCname);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Orders?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/OrderAll');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/OrderAll?ds=' + ppObj.DATE_SALE + '&vs=' + ppObj.VOU_SALE);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Orders/' + ppId);
            return $http.delete(url);
        },

        renewAMT: function (orderDetails) {
            var total = 0;
            angular.forEach(orderDetails, function (item) {
                total += item.ORD_QTYI * item.SALE_PRICE;
            });
            return total;
        },

        preparePostObj: function (ppObj) {

            var aa = {
                    DATE_SALE: new Date().yyyymmdd(),
                    VOU_SALE: ppObj.VOU_SALE,
                    CUST_ID: ppObj.CUST_ID,
                    IO_ID: "",
                    SALE_ID: ppObj.SALE_ID,
                    DRIVER_ID: "",
                    NC_MARK: "",
                    BUY_NO: "",
                    LABEL_MARK: "",
                    DISC_UTAX: "",
                    UTAX: "",
                    TAX: "",
                    AMT: "",
                    INVO_TYPE: "",
                    PROD_TAX: "",
                    USER_ID: "",
                    STAT_MARK: "",
                    ADD_MARK: "",
                    TIME_MARK: "",
                    DC_ID: "",
                    H_AMT: "",
                    INVO_MARK: "",
                    INVO_NO: "",
                    SELL_NO: "",
                    PRE_PROD: "",
                    SUBS_MARK: "",
                    MEMO: "",
                    TIME_ETA: "",
                };

                return aa;
          
        }
    };

}]);

