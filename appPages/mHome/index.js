
angular.module('app', []).controller('ListindexCtrl', [
    '$scope', '$state', '$rootScope',
    function ($scope, $state, $rootScope) {

        // 宣告vm
        $scope.vm = {};

        動作
        //產品與庫存管理
        $scope.goToProducts = function () {
            $state.go("m.Products.category", {type: 1});
        };
        //顧客關係
        $scope.goToCustomers = function () {
            $state.go("m.Customers.list");
        };
        //行程規劃
        $scope.goToEEvents = function () {
            $state.go("m.EEvents.plan");
        };
        //帳務管理
        $scope.goToUser = function () {
            $state.go("m.Orders.list");
        };
        //最新消息
        $scope.goToNews = function () {
            $state.go("m.News.dlist");
        };
        //設定
        $scope.goToSettings = function () {
            $state.go("m.Users.list");
        };


    }]);