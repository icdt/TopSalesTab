angular.module('icdt.states.m.Products', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.Products', {
            abstract: true,
            url: '/Products',
            template: '<div ui-view></div>'
        })
//-------List_category-----------------------------------------------
	    .state('m.Products.category', {
	        url: '/category/:type',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mProducts/list_category.html',
	                controller: 'ListCategoryCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mProducts/list_category.js');
	            }]
	        }
	    })
//-------List-----------------------------------------------
	    .state('m.Products.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mProducts/list.html',
	                controller: 'ListProductsCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mProducts/list.js');
	            }]
	        }
	    })
//-------mList-----------------------------------------------
	    .state('m.Products.mlist', {
	        url: '/mlist',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mProducts/mlist.html',
	                controller: 'mListProductsCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mProducts/mlist.js');
	            }]
	        }
	    })
//--------detail---------------------------------------------
        .state('m.Products.detail', {
            url: '/detail',
            views: {
                'content@m': {
                    templateUrl: 'appPages/mProducts/detail.html',
                    controller: 'EditProductsCtrl'
                }
            },
            resolve: {
                loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('appPages/mProducts/edit.js');
                }]
            }
        })
//--------Create----------------------------------------------
    	.state('m.Products.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mProducts/form.html',
    	            controller: 'CreateicdtdataCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mCRUD/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Products.edit', {
            url: '/edit',
            views: {
                'content@m': {
                    templateUrl: 'appPages/mProducts/form.html',
                    controller: 'EditProductsCtrl'
                }
            },
            resolve: {
                loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load('appPages/mProducts/edit.js');
                }]
            }
        })
    ;

}]);