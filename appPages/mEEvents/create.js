
angular.module('app', []).controller('CreateEEventsCtrl', [
    '$scope', '$state', '$rootScope', 'EEventsFactory',
    function ($scope, $state, $rootScope, EEventsFactory) {

    // 可取代EEvents為對應model名稱，例: EEvents --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.SingleObj = {};

    // 動作
    $scope.vm.save = function () {
        EEventsFactory.create($scope.vm.SingleObj).success(function (data) {
            $state.go('m.EEvents.list');
        }).error(function (err) {
            console.log(err);
        });

    };
    // 使用者介面基本設定
    $scope.vm.isEdit = false;

    
}]);