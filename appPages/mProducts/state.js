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
	        url: '/list/:cate',
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
	        url: '/mlist/:cate',
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
            url: '/detail/:productId',
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
    	    url: '/create/:cate',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mProducts/form.html',
    	            controller: 'CreateProductsCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mProducts/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.Products.edit', {
            url: '/edit/:productId',
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