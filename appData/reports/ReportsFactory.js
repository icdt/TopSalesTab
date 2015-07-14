app.factory('ReportsFactory', ['$http', 'UrlHelper', '$q', function ($http, UrlHelper, $q) {
    
    return{
        
        getOrdersByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/Reports/Orders?start=' + ppStart + '&end=' + ppEnd);
            return $http.get(url);
        },
       
        getSalesOrderReport: function (ppStart, ppEnd) {

            var defered = $q.defer();

            var url = UrlHelper.prepareUrl('api/Reports/Orders?start=' + ppStart + '&end=' + ppEnd);
            $http.get(url).success(function (data) {

                    var jjGroupByDate = _.groupBy(data, function (item) {
                        return item.SALE_ID;
                    });

                    var aaGroupByDate = [];
                    for (var key in jjGroupByDate) {
                        aaGroupByDate.push(jjGroupByDate[key]);
                    }
                    
                    angular.forEach(aaGroupByDate, function (singleArray) {
                        var total = 0;
                        angular.forEach(singleArray, function (item) {
                            total += item.AMT;
                        });
                        singleArray[0].TOTAL = total;
                    });

                    defered.resolve(aaGroupByDate);

            }).error(function (err) {
                defered.reject(err);
            });

            return defered.promise;
        },

        getProductMonthlyReport: function (ppYear, ppMonth) {
            var url = UrlHelper.prepareUrl('api/Reports?year=' + ppYear + '&month=' + ppMonth);
            return $http.get(url);
        },

        getCustomerOrderHistoryByProduct: function (customerId, productId) {
            var url = UrlHelper.prepareUrl('api/Reports?cid=' + customerId + '&pid=' + productId);
            return $http.get(url);
        },

        getCustomerOrderHistory: function (customerId) {
            var url = UrlHelper.prepareUrl('api/Reports?cid=' + customerId );
            return $http.get(url);
        }
    };

}]);

