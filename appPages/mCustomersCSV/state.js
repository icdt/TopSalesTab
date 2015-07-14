angular.module('icdt.states.m.CustomersCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.CustomersCSV', {
            abstract: true,
            url: '/CustomersCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.CustomersCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mCustomersCSV/list.html',
	                controller: 'ListCustomersCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mCustomersCSV/list.js');
	            }]
	        }
	    });

}]);