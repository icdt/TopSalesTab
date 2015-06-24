
angular.module('app', []).controller('ListOrdersCtrl', [
    '$scope', '$state', '$rootScope', 'OrdersFactory',
    function ($scope, $state, $rootScope, OrdersFactory) {

    // 可取代Orders為對應model名稱，例: Orders --> Order

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.Orders.create');
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Orders.edit");
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Orders.delete");
    };

    // 取得data填充ui grid
    OrdersFactory.getAll().success(function (data) {
        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '修改', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       { name: 'CompanyName', displayName: '訂單記錄編號', width: 150 },
       { name: 'Aliases', displayName: '客戶名稱', width: 120 },
       { name: 'VATnumber', displayName: '業務名稱', width: 120 },
       { name: 'CompanyAddress', displayName: '更新時間', width: 220 },
       { name: 'CompanyTel1', displayName: '狀態', width: 120 },
       { name: 'CompanyFax', displayName: '備註', width: 120 }
    ];


}]);