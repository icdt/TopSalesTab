angular.module('icdt.states.m.EEvents', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.EEvents', {
            abstract: true,
            url: '/EEvents',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    //.state('m.EEvents.list', {
	    //    url: '/list',
	    //    views: {
	    //        'content@m': {
	    //            templateUrl: 'appPages/mEEvents/list.html',
	    //            controller: 'ListEEventsCtrl'
	    //        }
	    //    },
	    //    resolve: {
	    //        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	    //            // you can lazy load files for an existing module
	    //            return $ocLazyLoad.load('appPages/mEEvents/list.js');
	    //        }]
	    //    }
	    //})
//-------Plan-----------------------------------------------
	    .state('m.EEvents.plan', {
	        url: '/plan',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mEEvents/plan.html',
	                controller: 'PlanEEventsCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mEEvents/plan.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.EEvents.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mEEvents/form.html',
    	            controller: 'CreateEEventsCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mEEvents/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.EEvents.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mEEvents/form.html',
        	        controller: 'EditEEventsCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mEEvents/edit.js');
        	    }]
        	}
        })
    ;

}]);