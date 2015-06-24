
angular.module('app', []).controller('EditEEventsCtrl', [
    '$scope', '$state', '$rootScope', 'EEventsFactory',
    function ($scope, $state, $rootScope, EEventsFactory) {

    // 可取代EEvents為對應model名稱，例: EEvents --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.singleObj = {};

    // 動作
    // 儲存
    $scope.vm.save = function () {
        EEventsFactory.update($scope.vm.singleObj).success(function (data) {

            $state.go('m.EEvents.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    // 刪除
    $scope.vm.remove = function () {
        EEventsFactory.remove($scope.vm.singleObj).success(function (data) {

            $state.go('m.EEvents.list');
        }).error(function (err) {
            console.log(err);
        });
    };

    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.singleObj = $rootScope.selectedObj;


}]);