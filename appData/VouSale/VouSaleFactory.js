app.factory('VouSaleFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {
    
    return{
        // checklist, select選項
        allLocationOptions:[{},{},{}],
                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/VouSale');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/VouSale/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/VouSale?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/VouSale?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/VouSale?name=' + ppObj.Name);
            return $http.get(url);
        },
        getByEMPID: function (pId) {
            var url = UrlHelper.prepareUrl('api/VouSale/' + pId);
            return $http.get(url);
        },
        getNewVouSaleByOrdMaster: function () {
            var url = UrlHelper.prepareUrl('api/NewVouSale');
            return $http.get(url);
        },

        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/VouSale');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/VouSale/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/VouSale/' + ppId);
            return $http.delete(url);
        }
    };

}]);

