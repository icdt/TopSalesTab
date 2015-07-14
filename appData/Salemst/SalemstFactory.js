app.factory('SalemstFactory', ['$http', 'UrlHelper', '$q', '$timeout', function ($http, UrlHelper, $q, $timeout) {
    
    return{
        // checklist, select選項
        allLocationOptions:[{},{},{}],
        

        getAutoCompleteOptions: function (data, i) {
            var moviedata = $q.defer();
            var movies;
            var moreMovies = [];

            for (var j = 0; j < data.length; j++) {
                moreMovies.push(data[j].EMP_NAME);
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
            var url = UrlHelper.prepareUrl('api/Salemsts');
            return $http.get(url);
        },
        getOne: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Salemst/' + ppId);
            return $http.get(url);
        },
        getByDate: function (ppDate) {
            var url = UrlHelper.prepareUrl('api/Salemst?date' + ppDate);
            return $http.get(url);
        },
        getByDateInterval: function (ppStart, ppEnd) {
            var url = UrlHelper.prepareUrl('api/Salemst?start=' + ppDappStartte + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByName: function (ppName) {
            var url = UrlHelper.prepareUrl('api/Salemsts?name=' + ppName);
            return $http.get(url);
        },
        getByEMPID: function (pId) {
            var url = UrlHelper.prepareUrl('api/Salemst/'+pId);
            return $http.get(url);
        },

        create: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Salemst');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/Salemst/' + ppObj.Id);
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/Salemst/' + ppId);
            return $http.delete(url);
        }
    };

}]);

