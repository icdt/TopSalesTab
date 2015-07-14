
angular.module('app', []).controller('DlistNewsCtrl', [
    '$scope', '$state', '$rootScope', 'NewsFactory','$global',
    function ($scope, $state, $rootScope, NewsFactory,$global) {

    // 可取代News為對應model名稱，例: News --> Order

    // 宣告vm
    $scope.vm = {};

    
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToDetailView = function (obj) {
        $global.selectedNews = obj;
        $state.go("m.News.detail");
    };
    
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
       { name: 'Detail', displayName: '詳細資訊', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToDetailView(row.entity)" helf= >詳細資訊</button></div> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', displayName: '刪除', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'ArticleTitle', displayName: '標題', width: 120 },
       { name: 'StartTime', displayName: '公告起始時間', width: 150 },
       { name: 'EndTime', displayName: '公告結束時間', width: 150 },
       
    ];


}]);