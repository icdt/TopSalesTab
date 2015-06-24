
angular.module('app', []).controller('CreateOrdersCtrl', [
    '$scope', '$state', '$rootScope', 'OrdersFactory',
    function ($scope, $state, $rootScope, OrdersFactory) {

    // 可取代Orders為對應model名稱，例: Orders --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.SingleObj = {};

    // 動作
    $scope.vm.save = function () {
        OrdersFactory.create($scope.vm.SingleObj).success(function (data) {
            $state.go('m.Orders.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);