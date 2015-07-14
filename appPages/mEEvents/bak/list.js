
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
       { name: 'Edit', displayName: '修改', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button></div> ', width: 100, pinnedLeft: true },
       { name: 'TITLE', displayName: '工作名稱', width: 150 },
       { name: 'VISIT_DATE', displayName: '拜訪時間',cellFilter: 'date:\'yyyy/MM/dd\'', width: 200 },
       { name: 'START_TIME', displayName: '開始時間', cellFilter: 'date:\'HH:mm\'', width: 200 },
       { name: 'END_TIME', displayName: '結束時間', cellFilter: 'date:\'HH:mm\'', width: 200 },
       { name: 'CUST_NAME', displayName: '客戶名稱', width: 120 },
       { name: 'EMP_NAME', displayName: '業務名稱', width: 120 },
       { name: 'PLAN', displayName: '規劃', width: 120 },
       { name: 'CONTENT', displayName: '訪談記錄', width: 120 }
    ];


}]);