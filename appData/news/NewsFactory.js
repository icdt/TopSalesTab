app.factory('NewsFactory', ['$http', 'UrlHelper', '$datetime', function ($http, UrlHelper, $datetime) {
    
    return{
        // checklist, select選項
        allLocationOptions:[{},{},{}],
                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/News');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/News/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/News?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/News?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/News?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/News');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/News/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/News/' + ppId);
            return $http.delete(url);
        },

        transformData: function (objs) {

            angular.forEach(objs, function (item) {
                item.StartTime = $datetime.formatDate( new Date(item.StartTime), "/" );
                item.EndTime = $datetime.formatDate( new Date(item.EndTime), "/");
            });

            return objs;
        }
    };

}]);

