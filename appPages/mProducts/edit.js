
angular.module('app', []).controller('EditProductsCtrl', [
    '$scope', '$state', '$rootScope', 'ProductsFactory',
    function ($scope, $state, $rootScope, ProductsFactory) {

        //額外內容
        CKEDITOR.replace('editor1');

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.singleObj = {};

        // 動作
        // 儲存
        $scope.vm.save = function () {
            ProductsFactory.update($scope.vm.singleObj).success(function (data) {

                $state.go('m.Products.list');
            }).error(function (err) {
                console.log(err);
            });
        };
        // 刪除
        $scope.vm.remove = function () {
            ProductsFactory.remove($scope.vm.singleObj).success(function (data) {

                $state.go('m.Products.list');
            }).error(function (err) {
                console.log(err);
            });
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = true;
        $scope.vm.singleObj = $rootScope.selectedObj;


    }]);

//只限輸入數字
function ValidateNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}