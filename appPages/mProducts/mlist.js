
angular.module('app', []).controller('mListProductsCtrl', [
    '$scope', '$state', '$rootScope', '$stateParams', 'ProductsFactory', '$global',
    function ($scope, $state, $rootScope, $stateParams, ProductsFactory, $global) {

        // 可取代Products為對應model名稱，例: Products --> Order
        $("#loading").fadeIn("fast");
        // 宣告vm
        $scope.vm = {};


        ProductsFactory.getProductsByCate($stateParams.cate).success(function (data) {
            $scope.vm.products = data;
            $("#loading").fadeOut("fast");
            //總數量
            //$scope.vm.quantity = data.length;
            //總價
            //var price = 0;
            //angular.forEach(data, function (item) {
            //    price += parseInt(item.SALE_PRICE) * parseInt(item.DLAST_QTYI);
            //});
            //$scope.vm.totalPrice = price;

        }).error(function (err) {
            console.log(err);
        });

        // 動作
        //新增產品頁面
        $scope.goToCreateForm = function () {
            $rootScope.selectedObj = "";
            $global.selectedProduct = { fsect_id: $scope.vm.products[0].FSECT_ID, cate: $stateParams.cate };
            $state.go("m.Products.create");
        };

        //編輯產品頁面
        $scope.goToUpdateForm = function (ppProductId) {
            $rootScope.selectedObj = ppProductId;
            $global.selectedProduct = _.find($scope.vm.products, function (item) { return item.PROD_ID == ppProductId });
            $state.go("m.Products.edit", { productId: ppProductId });
        };


    }]);