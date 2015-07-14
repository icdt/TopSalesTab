angular.module('icdt.states.m.OrdMasterHistCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.OrdMasterHistCSV', {
            abstract: true,
            url: '/OrdMasterHistCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.OrdMasterHistCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mOrdMasterHistCSV/list.html',
	                controller: 'ListOrdMasterHistCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mOrdMasterHistCSV/list.js');
	            }]
	        }
	    });

}]);