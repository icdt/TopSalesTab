angular.module('icdt.states.m.AllCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.AllCSV', {
            abstract: true,
            url: '/AllCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.AllCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mAllCSV/list.html',
	                controller: 'ListAllCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mAllCSV/list.js');
	            }]
	        }
	    });


}]);