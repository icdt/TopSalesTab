angular.module('icdt.states.m.PdacfgCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.PdacfgCSV', {
            abstract: true,
            url: '/PdacfgCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.PdacfgCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mPdacfgCSV/list.html',
	                controller: 'ListPdacfgCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mPdacfgCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.PdacfgCSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mPdacfgCSV/form.html',
    	            controller: 'CreatePdacfgCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mPdacfgCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.PdacfgCSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mPdacfgCSV/form.html',
        	        controller: 'EditPdacfgCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mPdacfgCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);