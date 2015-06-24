
angular.module('app', []).controller('ListCustomersCtrl', [
    '$scope', '$state', '$rootScope', 'CustomersFactory',
    function ($scope, $state, $rootScope, CustomersFactory) {

    // 可取代Customers為對應model名稱，例: Customers --> Order

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.Customers.create');
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Customers.edit");
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Customers.delete");
    };

    // 取得data填充ui grid
    CustomersFactory.getAll().success(function (data) {
       // $scope.gridOptions.data = data;

        $scope.gridOptions.data = {

            CustomerName: '王大明',
            Title: '店長',
            CompanyName: 'xxx西屯店',
            Email: 'customer1@gmail.com',
            Tel: '0912345678',
            LastTime: '2015/06/10',
            Business: '張三'

        };

    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '編輯', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       { name: 'CustomerName', displayName: '姓名', width: 150 },
       { name: 'Title', displayName: '職稱', width: 120 },
       { name: 'CompanyName', displayName: '公司名稱', width: 120 },
       { name: 'Email', displayName: 'Email', width: 220 },
       { name: 'Tel', displayName: '電話', width: 120 },
       { name: 'LastTime', displayName: '上次拜訪時間', width: 120 },
       { name: 'Business', displayName: '業務', width: 120 }
    ];
   
        
       
}]);