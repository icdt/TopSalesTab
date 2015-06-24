angular.module('icdt.states.m.Orders', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Orders', {
            abstract: true,
            url: '/Orders',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.Orders.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mOrders/list.html',
	                controller: 'ListOrdersCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mOrders/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.Orders.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mOrders/form.html',
    	            controller: 'CreateOrdersCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mOrders/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Orders.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mOrders/form.html',
        	        controller: 'EditOrdersCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mOrders/edit.js');
        	    }]
        	}
        })
    ;

}]);