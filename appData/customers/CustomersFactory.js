app.factory('CustomersFactory', ['$http', 'UrlHelper', '$q', '$timeout', function ($http, UrlHelper, $q, $timeout) {
    
    return {

        // 以 關鍵字查詢(找NickName 跟 ProductId) 產品名稱
        getByKeyword: function (ppKeyword) {
            var url = UrlHelper.prepareUrl('api/Customers?q=' + ppKeyword);
            return $http.get(url);
        },

        getAutoCompleteOptions: function (data, i) {
            var moviedata = $q.defer();
            var movies;
            var moreMovies = [];

            for (var j = 0; j < data.length; j++) {
                moreMovies.push(data[j].CUST_NAME);
            }

            if (i && i.indexOf('T') != -1)
                movies = moreMovies;
            else
                movies = moreMovies;

            $timeout(function () {
                moviedata.resolve(movies);
            }, 1000);

            return moviedata.promise
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
        getByName: function (pName) {
            var url = UrlHelper.prepareUrl('api/Customers?name=' + pName);
            return $http.get(url);
        },
        getById: function (pId) {
            var url = UrlHelper.prepareUrl('api/Customers/' + pId);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Customers');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Customers/' + ppObj.CUST_ID);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Customers/' + ppId);
            return $http.delete(url);
        }
    };

}]);

