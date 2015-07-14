
angular.module('app', []).controller('ListStockCSVCtrl', ['$scope', '$state', '$rootScope', 'fileUpload', 'ProductsFactory', function ($scope, $state, $rootScope, fileUpload, ProductsFactory) {

    // 宣告vm
    $scope.vm = {};

    // 動作
    $scope.vm.uploadStockCSV = function () {
        if (confirm("上傳檔案視網路速度需一至數分鐘")) {
            $("#loading").fadeIn("fast");
            var file = $scope.myFile;
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = "../../mvc/StockCSV";
            fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {
                ProductsFactory.getAll().success(function (data) {
                    $scope.gridOptions.data = data;
                    $("#loading").fadeOut("fast");
                }).error(function (err) {
                    console.log(err);
                });
            }).error(function (xhr) {
                alert(xhr);
                $("#loading").fadeOut("fast");
            });
        } else {
            return;
        }
       
    };

    $scope.vm.downloadStockCSV = function () {
        ProductsFactory.download().success(function (data) {
            //debugger;
            var temp = document.createElement('a');
            temp.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURI(data));
            temp.setAttribute('download', "Stocks.txt");
            temp.click();
        
        }).error(function (data) {
            debugger;
        });
    };


   

    // 取得data填充ui grid
    ProductsFactory.getAll().success(function (data) {
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
       { name: 'PROD_ID', displayName: '產品', width: 100 },
       { name: 'PROD_NAME', displayName: '部門名稱', width: 100 },
       { name: 'FSECT_ID', displayName: '部別', width: 100 },
       { name: 'SUB_ID', displayName: '中類代號', width: 100 },
       { name: 'SUB_NAME', displayName: '中類名稱', width: 100 },

    ];

}]);