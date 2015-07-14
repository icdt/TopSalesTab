angular.module('icdt.states.m.ForSaleCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.ForSaleCSV', {
            abstract: true,
            url: '/ForSaleCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.ForSaleCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mForSaleCSV/list.html',
	                controller: 'ListForSaleCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mForSaleCSV/list.js');
	            }]
	        }
	    });

}]);