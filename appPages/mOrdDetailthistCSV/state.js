angular.module('icdt.states.m.OrdDetailthistCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.OrdDetailthistCSV', {
            abstract: true,
            url: '/OrdDetailthistCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.OrdDetailthistCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mOrdDetailthistCSV/list.html',
	                controller: 'ListOrdDetailthistCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mOrdDetailthistCSV/list.js');
	            }]
	        }
	    });

}]);