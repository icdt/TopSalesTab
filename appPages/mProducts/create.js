
angular.module('app', []).controller('CreateProductsCtrl', [
    '$scope', '$state', '$rootScope', 'ProductsFactory',
    function ($scope, $state, $rootScope, ProductsFactory) {

    // 可取代Products為對應model名稱，例: Products --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.SingleObj = {};

    // 動作
    $scope.vm.save = function () {
        ProductsFactory.create($scope.vm.SingleObj).success(function (data) {
            $state.go('m.Products.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);