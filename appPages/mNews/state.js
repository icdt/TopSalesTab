angular.module('icdt.states.m.News', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.News', {
            abstract: true,
            url: '/News',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.News.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mNews/list.html',
	                controller: 'ListNewsCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mNews/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.News.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mNews/form.html',
    	            controller: 'CreateNewsCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mNews/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.News.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mNews/form.html',
        	        controller: 'EditNewsCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mNews/edit.js');
        	    }]
        	}
        })
                    .state('m.News.dlist', {
                        url: '/dlist',
                        views: {
                            'content@m': {
                                templateUrl: 'appPages/mNews/dlist.html',
                                controller: 'DlistNewsCtrl'
                            }
                        },
                        resolve: {
                            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                // you can lazy load files for an existing module
                                return $ocLazyLoad.load('appPages/mNews/dlist.js');
                            }]
                        }
                    })
            .state('m.News.detail', {
                url: '/detail',
                views: {
                    'content@m': {
                        templateUrl: 'appPages/mNews/detail.html',
                        controller: 'DetailNewsCtrl'
                    }
                },
                resolve: {
                    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('appPages/mNews/detail.js');
                    }]
                }
            })
    ;

}]);