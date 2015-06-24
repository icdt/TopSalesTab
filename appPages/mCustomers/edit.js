
angular.module('app', []).controller('EditCustomersCtrl', [
    '$scope', '$state', '$rootScope', 'CustomersFactory',
    function ($scope, $state, $rootScope, CustomersFactory) {

    // 可取代Customers為對應model名稱，例: Customers --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.customer = {};

    // 動作
    // 儲存
    $scope.vm.save = function () {
        CustomersFactory.update($scope.vm.customer).success(function (data) {

            $state.go('m.Customers.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    // 刪除
    $scope.vm.remove = function () {
        CustomersFactory.remove($scope.vm.customer).success(function (data) {

            $state.go('m.Customers.list');
        }).error(function (err) {
            console.log(err);
        });
    };

    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.customer = $rootScope.selectedObj;


}]);