app.factory('ProductsFactory', ['$http', 'UrlHelper', '$q', '$timeout', function ($http, UrlHelper, $q, $timeout) {
    
    return{
        // 取得 大類
        getBigCate:function(){
            var url = UrlHelper.prepareUrl('api/Stocks/bigCate');
            return $http.get(url);
        },
        // 取得 中類     
        getMedCate: function (bigCate) {
            var url = UrlHelper.prepareUrl('api/Stocks/medCate?q=' + bigCate);
            return $http.get(url);
        },

        // 取得 小類
        getSmallCate: function (medCate) {
            var url = UrlHelper.prepareUrl('api/Stocks/smallCate?q=' + medCate);
            return $http.get(url);
        },

        // 取得 小類
        getProductsByCate: function (cate) {
            var url = UrlHelper.prepareUrl('api/Stocks?cate=' + cate);
            return $http.get(url);
        },

        // 以 關鍵字查詢(找NickName 跟 ProductId) 產品名稱
        getByKeyword: function (ppKeyword) {
            var url = UrlHelper.prepareUrl('api/Stocks?q=' + ppKeyword);
            return $http.get(url);
        },

        getOneByProductId: function (ppId) {
            // ppId 須為 productId
            var url = UrlHelper.prepareUrl('api/Stocks/' + ppId);
            return $http.get(url);
        },

        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/Stocks');
            return $http.get(url);
        },
        getAllSimple: function () {
            var url = UrlHelper.prepareUrl('api/StocksListAll');
            return $http.get(url);
        },

        getAutoCompleteOptions: function (data, i) {
            var moviedata = $q.defer();
            var movies;
            var moreMovies = [];

            for (var j = 0; j < data.length; j++) {
                moreMovies.push(data[j].PROD_NAME);
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

        getOne: function (ppId) {
            // ppId 須為 productId
            var url = UrlHelper.prepareUrl('api/Stocks/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/Stocks?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/Stocks?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (pName) {
            var url = UrlHelper.prepareUrl('api/Stocks?name=' + pName);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Stocks');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Stocks/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Stocks/' + ppId);
            return $http.delete(url);
        },

        download: function () {
            var url = 'http://localhost:1131/mvc/StockCsvDo';
            return $http.post(url);

        },

        upload: function (owner, folder, ppObj) {
            var url = UrlHelper.prepareUrl('api/files?owner=' + owner + '&folder=' + folder);
            return $http.post(url, ppObj);

        },
        transformData: function(products){

            angular.forEach(products, function(item){
                item.PHOTO = UrlHelper.prepareUrl(item.PHOTO);
            });

            return products;
        }
    };

}]);

