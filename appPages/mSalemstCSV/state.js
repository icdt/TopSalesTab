angular.module('icdt.states.m.SalemstCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.SalemstCSV', {
            abstract: true,
            url: '/SalemstCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.SalemstCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mSalemstCSV/list.html',
	                controller: 'ListSalemstCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mSalemstCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.SalemstCSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mSalemstCSV/form.html',
    	            controller: 'CreateSalemstCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mSalemstCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.SalemstCSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mSalemstCSV/form.html',
        	        controller: 'EditSalemstCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mSalemstCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);