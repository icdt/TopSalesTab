
angular.module('app', []).controller('ListindexCtrl', [
    '$scope', '$state', '$rootScope',
    function ($scope, $state, $rootScope) {

        // 可取代icdtdata為對應model名稱，例: icdtdata --> Order

        // 宣告vm
        $scope.vm = {};

        // 動作
        //產品與庫存管理
        $scope.goToProducts = function (obj) {
            $state.go("m.Products.category");
        };
        //顧客關係
        $scope.goToCustomers = function (obj) {
            $state.go("m.Products.category");
        };
        //行程規劃
        $scope.goToEEvents = function (obj) {
            $state.go("m.Products.category");
        };
        //帳務管理
        $scope.goToUser = function (obj) {
            $state.go("m.Products.category");
        };
        //最新消息
        $scope.goToNews = function (obj) {
            $state.go("m.Products.category");
        };
        //設定
        $scope.goToSettings = function (obj) {
            $state.go("m.Products.category");
        };


    }]);