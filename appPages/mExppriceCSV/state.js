angular.module('icdt.states.m.ExppriceCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.ExppriceCSV', {
            abstract: true,
            url: '/ExppriceCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.ExppriceCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mExppriceCSV/list.html',
	                controller: 'ListExppriceCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mExppriceCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.ExppriceCSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mExppriceCSV/form.html',
    	            controller: 'CreateExppriceCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mExppriceCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.ExppriceCSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mExppriceCSV/form.html',
        	        controller: 'EditExppriceCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mExppriceCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);