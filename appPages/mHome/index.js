
angular.module('app', []).controller('ListindexCtrl', [
    '$scope', '$state', '$rootScope',
    function ($scope, $state, $rootScope) {

        // 宣告vm
        $scope.vm = {};

        //動作
        //產品與庫存管理
        $scope.vm.goToProducts = function () {
            $state.go("m.Products.category", {type: 1});
        };
        //顧客關係
        $scope.vm.goToCustomers = function () {
            $state.go("m.Customers.list");
        };
        //行程規劃
        $scope.vm.goToEEvents = function () {
            $state.go("m.EEvents.plan");
        };
        //帳務管理
        $scope.vm.goToOrders = function () {
            $state.go("m.Orders.list");
        };
        //最新消息
        $scope.vm.goToNews = function () {
            $state.go("m.News.dlist");
        };
        //設定
        $scope.vm.goToSettings = function () {
            $state.go("m.Users.list");
        };


    }]);