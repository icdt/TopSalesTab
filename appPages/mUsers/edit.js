
angular.module('app', []).controller('EditUsersCtrl', [
    '$scope', '$state', '$rootScope', 'UsersFactory', 'GroupsFactory',
    function ($scope, $state, $rootScope, UsersFactory, GroupsFactory) {

    // 可取代Users為對應model名稱，例: Users --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.theUser = {};
    $scope.vm.allGroups = [];
    $scope.vm.theUserGroups = [];

    // 動作
    // 儲存
    $scope.vm.save = function () {

        var updateObj = {
            Id: $scope.vm.theUser.Id,
            EMP_ID: $scope.vm.theUser.EMP_ID,
            EMP_NAME: $scope.vm.theUser.EMP_NAME,
            UserName : $scope.vm.theUser.UserName,
            Email: $scope.vm.theUser.Email,
            NewPassword: $scope.vm.theUser.NewPassword,
            UserGroups: $scope.vm.theUserGroups
        };

        UsersFactory.update(updateObj).success(function (data) {

            alert('儲存成功');
            $state.go('m.Users.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    // 刪除
    $scope.vm.remove = function () {
        UsersFactory.remove($scope.vm.Users).success(function (data) {

            $state.go('m.Users.list');
        }).error(function (err) {
            console.log(err);
        });
    };

        GroupsFactory.getAll().success(function (data) {
            debugger;
        $scope.vm.allGroups = data;
    }).error(function (err) {
        console.log(err);
    });


    
    UsersFactory.getOne($rootScope.selectedObj.Id).success(function (data) {
        
        $scope.vm.theUserGroups = data.UserGroups;

    }).error(function (err) {
        console.log(err);
    });


    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.theUser = $rootScope.selectedObj;


}]);