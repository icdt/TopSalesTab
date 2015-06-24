angular.module('icdt.states.m.SectionCSV', [])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('m.SectionCSV', {
            abstract: true,
            url: '/SectionCSV',
            template: '<div ui-view></div>'
        })
//-------List-----------------------------------------------
	    .state('m.SectionCSV.list', {
	        url: '/list',
	        views: {
	            'content@m': {
	                templateUrl: 'appPages/mSectionCSV/list.html',
	                controller: 'ListSectionCSVCtrl'
	            }
	        },
	        resolve: {
	            loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                // you can lazy load files for an existing module
	                return $ocLazyLoad.load('appPages/mSectionCSV/list.js');
	            }]
	        }
	    })
//--------Create----------------------------------------------
    	.state('m.SectionCSV.create', {
    	    url: '/create',
    	    views: {
    	        'content@m': {
    	            templateUrl: 'appPages/mSectionCSV/form.html',
    	            controller: 'CreateSectionCSVCtrl'
    	        }
    	    },
    	    resolve: {
    	        loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
    	            // you can lazy load files for an existing module
    	            return $ocLazyLoad.load('appPages/mSectionCSV/create.js');
    	        }]
    	    }
    	})
//--------edit---------------------------------------------
        .state('m.SectionCSV.edit', {
        	url: '/edit',
        	views: {
        	    'content@m': {
        	        templateUrl: 'appPages/mSectionCSV/form.html',
        	        controller: 'EditSectionCSVCtrl'
        	    }
        	},
        	resolve: {
        	    loadcustomerListCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        	        // you can lazy load files for an existing module
        	        return $ocLazyLoad.load('appPages/mSectionCSV/edit.js');
        	    }]
        	}
        })
    ;

}]);