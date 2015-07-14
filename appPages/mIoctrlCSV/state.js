angular.module('icdt.states.m.IoctrlCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.IoctrlCSV', {
            abstract: true,
            url: '/IoctrlCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.IoctrlCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mIoctrlCSV/list.html',
	                controller: 'ListIoctrlCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mIoctrlCSV/list.js');
	            }]
	        }
	    });

}]);