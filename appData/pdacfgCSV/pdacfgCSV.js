app.factory('PdacfgCSVFactory', ['$q', '$http', 'UrlHelper', function ($q, $http, UrlHelper) {


    return {

        getAll: function () {
            var url = UrlHelper.prepareUrl('api/Pdacfgs');
            return $http.get(url);
        },

        //getOne: function (ppId) {
        //    var url = UrlHelper.prepareUrl('api/Departs/' + ppId);
        //    return $http.get(url);
        //},

        //create: function (ppObj) {
        //    var url = UrlHelper.prepareUrl('api/Departs');
        //    return $http.post(url, ppObj);
        //},


        //update: function (ppObj) {
        //    var url = UrlHelper.prepareUrl('api/Departs/' + ppObj.Id);
        //    return $http.put(url, ppObj);
        //},


        //remove: function (ppId) {
        //    var url = UrlHelper.prepareUrl('api/Departs/' + ppId);
        //    return $http.delete(url);
        //}
    };
}])