angular.module('icdt.states.m.ProcessCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.ProcessCSV', {
            abstract: true,
            url: '/ProcessCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.ProcessCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mProcessCSV/list.html',
	                controller: 'ListProcessCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mProcessCSV/list.js');
	            }]
	        }
	    });

}]);