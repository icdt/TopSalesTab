angular.module('icdt.states.m.Customers', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Customers', {
            abstract: true,
            url: '/Customers',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.Customers.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mCustomers/list.html',
	                controller: 'ListCustomersCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mCustomers/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.Customers.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mCustomers/form.html',
    	            controller: 'CreateCustomersCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mCustomers/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Customers.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mCustomers/form.html',
        	        controller: 'EditCustomersCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mCustomers/edit.js');
        	    }]
        	}
        })
    ;

}]);