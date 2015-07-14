var app = angular.module('app', [
    'ui.router',
    'oc.lazyLoad',
    'ngToast',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'UIGRID',
    'icdt.settings',
    'utility',
    'checklist-model',
    'kendo.directives',    
    'autocomplete',
    'ngDialog',
    'infinite-scroll',

    //state
    'icdt.states.m',
    'icdt.states.m.Home',
    'icdt.states.m.Users',
    'icdt.states.m.Products',
    'icdt.states.m.Customers',
    'icdt.states.m.EEvents',
    'icdt.states.m.News',
    'icdt.states.m.Orders',
    'icdt.states.m.Reports'

    // 'icdt.states.m.CSV',
    // 'icdt.states.m.DepartCSV',
    // 'icdt.states.m.ExppriceCSV',
    // 'icdt.states.m.SectionCSV',
    // 'icdt.states.m.StockCSV',
    // 'icdt.states.m.AllCSV',
    // 'icdt.states.m.CustomersCSV',
    // 'icdt.states.m.ForSaleCSV',
    // 'icdt.states.m.PricLockCSV',
    // 'icdt.states.m.VouctrlCSV',
    // 'icdt.states.m.SalemstCSV',
    // 'icdt.states.m.IoctrlCSV',
    // 'icdt.states.m.ProcessCSV',
    // 'icdt.states.m.OrdMasterHistCSV',
    // 'icdt.states.m.OrdDetailthistCSV',
    // 'icdt.states.m.PdacfgCSV',

]);

app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // 一進站新看localStorage內有沒有登入資訊
            try {
                User.isAuthenticated();
                $rootScope.loginUser = User.getUserData();
            } catch (e) {
                // do nothing with this error
            }

            // 若未驗證成功會有stateChangeError, 判斷error名字，轉到登入會面
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error.name === 'AuthenticationRequired') {
                    //User.setNextState(toState.name, 'You must login to access this page');
                    //alert("Login error, pls check user/pass");
                    $state.go('login', {}, { reload: true });
                }
            });
        }
]);


app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ngToastProvider',
function ($stateProvider, $urlRouterProvider, $httpProvider, ngToastProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/',
        templateUrl: 'appPages/alogin/index.html',
        controller: 'LoginCtrl',
        resolve: {
            bodyClass: ['$rootScope', function ($rootScope) {
                $rootScope.bodyClass = 'login-page';
                //$rootScope.wrapperClass = 'login-box';
            }]
        }
    });
    // .state('register', {
    //     url: '/register',
    //     templateUrl: 'appPages/aRegister/index.html',
    //     controller: 'RegisterCtrl',
    //     resolve: {
    //         bodyClass: ['$rootScope', function ($rootScope) {
    //             $rootScope.bodyClass = 'login-page';
    //             //$rootScope.wrapperClass = 'login-box';
    //         }]
    //     }
    // })
    // .state('changePassword', {
    //     url: '/changePassword',
    //     templateUrl: 'appPages/aUserChangePassword/index.html',
    //     controller: 'UserChangePasswordCtrl',
    //     resolve: {
    //         bodyClass: ['$rootScope', function ($rootScope) {
    //             $rootScope.bodyClass = 'login-page';
    //             //$rootScope.wrapperClass = 'login-box';
    //         }]
    //     }
    // });

    ngToastProvider.configure({
        animation: 'slide', // or 'fade'
        verticalPosition: 'top',
        horizontalPosition:'center'
    });

}]);

angular.module('UIGRID', ['ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.cellNav', 'ui.grid.autoResize']);