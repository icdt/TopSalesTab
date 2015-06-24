angular.module('icdt.states.m.StockCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.StockCSV', {
            abstract: true,
            url: '/StockCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.StockCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mStockCSV/list.html',
	                controller: 'ListStockCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mStockCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.StockCSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mStockCSV/form.html',
    	            controller: 'CreateStockCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mStockCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.StockCSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mStockCSV/form.html',
        	        controller: 'EditStockCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mStockCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);