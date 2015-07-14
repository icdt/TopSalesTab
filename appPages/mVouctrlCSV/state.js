angular.module('icdt.states.m.VouctrlCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.VouctrlCSV', {
            abstract: true,
            url: '/VouctrlCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.VouctrlCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mVouctrlCSV/list.html',
	                controller: 'ListVouctrlCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mVouctrlCSV/list.js');
	            }]
	        }
	    });

}]);