angular.module('icdt.states.m.Reports', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Reports', {
            abstract: true,
            url: '/Reports',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.Reports.orders', {
	        url: '/orders',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mReports/list.html',
	                controller: 'OrdersReportsCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mReports/list.js');
	            }]
	        }
	    })
        	.state('m.Reports.sales', {
        	    url: '/sales',
        	    views: {
        	        'content@m': {
        	            templateUrl: 'appPages/mReports/report2.html',
        	            controller: 'SalesReportsCtrl'
        	        }
        	    },
        	    resolve: {
        	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	            // you can lazy load files for an existing module
        	            return $ocLazyLoad.load('appPages/mReports/report2.js');
        	        }]
        	    }
        	})
                	.state('m.Reports.customerOrderHistory', {
                	    url: '/customerOrderHistory',
                	    views: {
                	        'content@m': {
                	            templateUrl: 'appPages/mReports/report3.html',
                	            controller: 'customerOrderHistoryReportsCtrl'
                	        }
                	    },
                	    resolve: {
                	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                	            // you can lazy load files for an existing module
                	            return $ocLazyLoad.load('appPages/mReports/report3.js');
                	        }]
                	    }
                	})
//--------Create----------------------------------------------
    	.state('m.Reports.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mReports/form.html',
    	            controller: 'CreateReportsCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mReports/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Reports.edit', {
            url: '/edit',
            views: {
                'content@m': {
                    templateUrl: 'appPages/mReports/form.html',
                    controller: 'EditReportsCtrl'
                }
            },
            resolve: {
                loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('appPages/mReports/edit.js');
                }]
            }
        })
    ;

}]);