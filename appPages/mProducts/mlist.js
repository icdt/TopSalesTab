
angular.module('app', []).controller('mListProductsCtrl', [
    '$scope', '$state', '$rootScope', 'ProductsFactory',
    function ($scope, $state, $rootScope, ProductsFactory) {

        // 可取代Products為對應model名稱，例: Products --> Order

        // 宣告vm
        $scope.vm = {};

        // 動作
        $scope.goToUpdateForm = function (obj) {
            $rootScope.selectedObj = obj;
            $state.go("m.Products.edit");
        };

        // 取得data填充ui grid
        ProductsFactory.getAll().success(function (data) {
            $scope.gridOptions.data = data;
        }).error(function (err) {
            console.log(err);
        });


    }]);