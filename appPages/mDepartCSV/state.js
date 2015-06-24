angular.module('icdt.states.m.DepartCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.DepartCSV', {
            abstract: true,
            url: '/DepartCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.DepartCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mDepartCSV/list.html',
	                controller: 'ListDepartCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mDepartCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.DepartCSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mDepartCSV/form.html',
    	            controller: 'CreateDepartCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mDepartCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.DepartCSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mDepartCSV/form.html',
        	        controller: 'EditDepartCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mDepartCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);