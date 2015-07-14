angular.module('icdt.states.m.PricLockCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.PricLockCSV', {
            abstract: true,
            url: '/PricLockCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.PricLockCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mPricLockCSV/list.html',
	                controller: 'ListPricLockCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mPricLockCSV/list.js');
	            }]
	        }
	    });

}]);