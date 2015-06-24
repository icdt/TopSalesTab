app.factory('EEventsFactory', ['$http', 'UrlHelper', function ($http, UrlHelper) {
    
    return{
        // checklist, select選項
        allLocationOptions:[{},{},{}],
                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/EEvents');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/EEvents/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/EEvents?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/EEvents?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/EEvents?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/EEvents');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/EEvents/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/EEvents/' + ppId);
            return $http.delete(url);
        }
    };

}]);

