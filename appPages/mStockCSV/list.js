
angular.module('app', []).controller('ListStockCSVCtrl', ['$scope', '$state', '$rootScope', 'fileUpload', 'ProductsFactory', function ($scope, $state, $rootScope, fileUpload, ProductsFactory) {

    // 宣告vm
    $scope.vm = {};

    // 動作
    $scope.vm.uploadStockCSV = function () {
        debugger;
        var file = $scope.myFile;
        debugger;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "../../mvc/StockCSV";
        fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {
            location.reload();
        }).error(function () {
            alert('上傳錯誤');
        });
    };


    // 取得data填充ui grid
    ProductsFactory.getAll().success(function (data) {
        debugger;

        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       //{ name: 'Edit', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'ProductId', displayName: '產品', width: 100 },
       { name: 'NickName', displayName: '部門名稱', width: 100 },
       //{ name: 'TempFieldA', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldB', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldC', displayName: '新欄位', width: 100 },
       { name: 'KindCategory', displayName: '新欄位', width: 100 },
       { name: 'Kind', displayName: '新欄位', width: 100 },
       { name: 'Category', displayName: '新欄位', width: 100 },
       { name: 'Price', displayName: '新欄位', width: 100 },
       { name: 'ConversionFactor', displayName: '新欄位', width: 100 },
       { name: 'StandardUnit', displayName: '新欄位', width: 100 },
       { name: 'MinimalTradeNumber', displayName: '新欄位', width: 100 },
       { name: 'MinimalUnit', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldD', displayName: '新欄位', width: 100 },
       { name: 'Barcode', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldE', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldF', displayName: '新欄位', width: 100 },
       { name: 'MinimalBarcode', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldG', displayName: '新欄位', width: 100 },
       { name: 'CatergoryName', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldH', displayName: '新欄位', width: 100 },
       //{ name: 'TempFieldI', displayName: '新欄位', width: 100 },
       { name: 'CatergoryName', displayName: '新欄位', width: 100 }
    ];

}]);