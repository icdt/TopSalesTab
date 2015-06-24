
angular.module('app', []).controller('ListEEventsCtrl', [
    '$scope', '$state', '$rootScope', 'EEventsFactory',
    function ($scope, $state, $rootScope, EEventsFactory) {

    // 可取代EEvents為對應model名稱，例: EEvents --> Order

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.EEvents.create');
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.EEvents.edit");
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.EEvents.delete");
    };

    // 取得data填充ui grid
    EEventsFactory.getAll().success(function (data) {
        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '修改', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       { name: 'WorkName', displayName: '工作名稱', width: 150 },
       { name: 'FirstIssue', displayName: '優先順序', width: 120 },
       { name: 'CustomerName', displayName: '客戶名稱', width: 120 },
       { name: 'SaleName', displayName: '業務名稱', width: 220 },
       { name: 'EndDate', displayName: '截止日期', width: 120 },
       { name: 'Plan', displayName: '規劃', width: 120 }
    ];


}]);