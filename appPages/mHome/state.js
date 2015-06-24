angular.module('icdt.states.m.Home', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Home', {
            abstract: true,
            url: '/Home',
            template: '<div ui-view></div>'
        })
//-------index-----------------------------------------------
	    .state('m.Home.index', {
	        url: '/index',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mHome/index.html',
	                controller: 'ListindexCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mHome/index.js');
	            }]
	        }
	    })
    ;

}]);