
angular.module('app', []).controller('CreateNewsCtrl', [
    '$scope', '$state', '$rootScope', 'NewsFactory',
    function ($scope, $state, $rootScope, NewsFactory) {

    // 可取代News為對應model名稱，例: News --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.SingleObj = {};

    // 動作
    $scope.vm.save = function () {
        NewsFactory.create($scope.vm.SingleObj).success(function (data) {
            $state.go('m.News.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

   $("#Start_Date").kendoDatePicker({
        culture: "zh-CHT",
        format: "yyyy/MM/dd"
    });


    
}]);