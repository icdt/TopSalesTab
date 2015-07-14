
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

    $scope.goToUpdateIsTop = function (obj) {
        obj.IsTop = !obj.IsTop;
        NewsFactory.update(obj).success(function () { alert('修改成功'); }).error(function (xhr, bhr, ghr) { alert(xhr.Message); })
    }
    
    $scope.goToUpdateIsShow = function (obj) {
        obj.IsShow = !obj.IsShow;
        NewsFactory.update(obj).success(function () { alert('修改成功'); }).error(function (xhr, bhr, ghr) { alert(xhr.Message); })
    }


    // 取得data填充ui grid
    NewsFactory.getAll().success(function (data) {
       
        data = NewsFactory.transformData(data);
        $scope.gridOptions.data = data;
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       { name: 'Edit', displayName: '修改', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button></div> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', displayName: '刪除', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'ArticleTitle', displayName: '標題', width: 120 },
       { name: 'StartTime', displayName: '建立時間', width: 150 },
       { name: 'IsTop', displayName: '置頂', width: 120, cellTemplate: '<div><input type="checkbox" ng-model="vm.theNews.IsTop" ng-checked="row.entity.IsTop" ng-click="grid.appScope.goToUpdateIsTop(row.entity)" /></div>' },
       { name: 'IsShow', displayName: '顯示', width: 120, cellTemplate: '<div><input type="checkbox" ng-model="vm.theNews.IsShow" ng-checked="row.entity.IsShow" ng-click="grid.appScope.goToUpdateIsShow(row.entity)" /></div>' }
    ];


}]);