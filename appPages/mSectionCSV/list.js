
angular.module('app', []).controller('ListSectionCSVCtrl', [
    '$scope', '$state', '$rootScope', 
    function ($scope, $state, $rootScope) {

    // 宣告vm
    $scope.vm = {};

    // 動作
    $scope.vm.uploadSectionCSV = function () {
        debugger;
        var file = $scope.myFile;
        debugger;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "../../mvc/SectionCSV";
        fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {
            location.reload();
        }).error(function () {
            alert('上傳錯誤');
        });
    };


    // 取得data填充ui grid
    

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       //{ name: 'Edit', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'Code', displayName: '地區代號', width: 100 },
       { name: 'Name', displayName: '地區名稱', width: 100 }
    ];


}]);