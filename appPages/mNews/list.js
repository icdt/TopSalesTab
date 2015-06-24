
angular.module('app', []).controller('ListNewsCtrl', [
    '$scope', '$state', '$rootScope', 'NewsFactory',
    function ($scope, $state, $rootScope, NewsFactory) {

    // 可取代News為對應model名稱，例: News --> Order

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.vm.goToCreateForm = function () {
        $state.go('m.News.create');
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.News.edit");
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.News.delete");
    };

    // 取得data填充ui grid
    NewsFactory.getAll().success(function (data) {
        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '修改', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', displayName: '刪除', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'Title', displayName: '標題', width: 120 },
       { name: 'Update', displayName: '更新時間', width: 150 },
       { name: 'Top', displayName: '置頂', width: 120 },
       { name: 'View', displayName: '顯示', width: 120 },
       { name: 'PostDate', displayName: '公告日期時間區間', width: 150 }
    ];


}]);