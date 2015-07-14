app.factory('EEventsFactory', ['$http', 'UrlHelper', '$datetime', function ($http, UrlHelper, $datetime) {
    
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
            var url = UrlHelper.prepareUrl('api/EEvents?start=' + ppStart + '&end=' + ppEnd);
            return $http.get(url);
        },
        getByDateIntervalAndCustomer: function (ppStart, ppEnd, ppCname) {
            var url = UrlHelper.prepareUrl('api/EEvents?start=' + ppStart + '&end=' + ppEnd + "&cname=" + ppCname);
            return $http.get(url);
        },
        getByName: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/EEvents?name=' + ppObj.Name);
            return $http.get(url);
        },
        create: function (ppObj) {
            
            ppObj.START_TIME = ppObj.START_TIME.toTimeString().split(' ')[0].substring(0, 5);
            ppObj.END_TIME = ppObj.END_TIME.toTimeString().split(' ')[0].substring(0, 5);

            var url = UrlHelper.prepareUrl('api/EEvents');
            return $http.post(url, ppObj);
        },
        update: function (ppObj) {

            ppObj.START_TIME = ppObj.START_TIME.toTimeString().split(' ')[0].substring(0, 5);
            ppObj.END_TIME = ppObj.END_TIME.toTimeString().split(' ')[0].substring(0, 5);
                //ppObj.START_TIME = $datetime.formatTime2(new Date(ppObj.START_TIME), ':');
                //console.log($scope.vm.eevent.START_TIME);
                //debugger;
                //ppObj.END_TIME = $datetime.formatTime2(new Date(ppObj.END_TIME), ':');

            var url = UrlHelper.prepareUrl('api/EEvents/' + ppObj.Id);
            //debugger;
            return $http.put(url, ppObj);
        },
        remove: function (ppId) {
            var url = UrlHelper.prepareUrl('api/EEvents/' + ppId);
            return $http.delete(url);
        },

       // transformData: function (objs) {

        //    angular.forEach(objs, function (item) {
                //item.START_TIME = new Date(item.START_TIME);
                //item.END_TIME = new Date(item.END_TIME);

           //     item.VISIT_DATE = $datetime.formatDate(new Date(item.VISIT_DATE), '/');
                //item.LastUpdateTime = new Date(item.LastUpdateTime);
         //   });

       // return objs;
 //   }
    };

}]);

