app.factory('ProductsFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {
    
    return{
        // 取得 大類 中類
        getKindCategory:function(){
            var url = UrlHelper.prepareUrl('api/Products/GetKindCategory');
            return $http.get(url);
        },
        // 取得 中類 下的產品列表         
        getProductByKindCategory: function(ppKind, ppCategory){
            var url = UrlHelper.prepareUrl('api/Products?kind=' + ppKind + '&category=' + ppCategory);
            return $http.get(url);
        },
        // 以 關鍵字查詢(找NickName 跟 ProductId) 產品名稱
        getByKeyword: function (ppKeyword) {
            var url = UrlHelper.prepareUrl('api/Products?q=' + ppKeyword);
            return $http.get(url);
        },

        getOneByProductId: function (ppId) {
            // ppId 須為 productId
            var url = UrlHelper.prepareUrl('api/Products/' + ppId);
            return $http.get(url);
        },

        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/Products');
            return $http.get(url);
        },
        getOne: function (ppId) {
            // ppId 須為 productId
            var url = UrlHelper.prepareUrl('api/Products/' + ppId);
            return $http.get(url);
        },
        //getByDate: function (ppDate) {
        //    var url = UrlHelper.prepareUrl('api/Products?date' + ppDate);
        //    return $http.get(url);
        //},
        //getByDateInterval: function (ppStart, ppEnd) {
        //    var url = UrlHelper.prepareUrl('api/Products?start=' + ppDappStartte + '&end=' + ppEnd);
        //    return $http.get(url);
        //},
        //getByName: function (ppObj) {
        //    var url = UrlHelper.prepareUrl('api/Products?name=' + ppObj.Name);
        //    return $http.get(url);
        //},
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Products');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Products/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Products/' + ppId);
            return $http.delete(url);
        }
    };

}]);

