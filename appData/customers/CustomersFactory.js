app.factory('CustomersFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {
    
    return {

        // 以 關鍵字查詢(找NickName 跟 ProductId) 產品名稱
        getByKeyword: function (ppKeyword) {
            var url = UrlHelper.prepareUrl('api/Customers?q=' + ppKeyword);
            return $http.get(url);
        },

        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/Customers');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Customers/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/Customers?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/Customers?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Customers?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Customers');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Customers/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Customers/' + ppId);
            return $http.delete(url);
        }
    };

}]);

