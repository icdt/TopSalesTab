
angular.module('app', []).controller('EditNewsCtrl', [
    '$scope', '$state', '$rootScope', 'NewsFactory', '$timeout', '$datetime',
    function ($scope, $state, $rootScope, NewsFactory, $timeout, $datetime) {
   
    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.theNews = {};
    // 動作
    // 儲存
    $scope.vm.save = function () {
        debugger;

        if (new Date($scope.vm.theNews.StartTime) > new Date($scope.vm.theNews.EndTime))
        {
            $scope.signup_form.isStartBigggerThanEndError = true;
            $scope.signup_form.submitted = true;
            return;
        }

        if ($scope.signup_form.$valid) {
            $scope.vm.theNews.ArticleContent = editor.getData();
            NewsFactory.update($scope.vm.theNews).success(function (data) {
                $state.go('m.News.list');
                $scope.signup_form.submitted = false;
                alert("儲存成功!!");
            }).error(function (err) {
                alert("操作失敗!!");
            });
           
        } else {
            $scope.signup_form.submitted = true;
            
        }
        
    };
    // 刪除
    $scope.vm.remove = function () {
        debugger;
        NewsFactory.remove($scope.vm.theNews.Id).success(function (data) {

            $state.go('m.News.list');
        }).error(function (err) {
            console.log(err);
        });
    };
    
    $scope.vm.compareStartEnd = function () {

        //if ($scope.signup_form.submitted == false) {
        //    return;
        //}

        if (new Date($scope.vm.theNews.StartTime) > new Date($scope.vm.theNews.EndTime)) {
            $scope.signup_form.isStartBigggerThanEndError = true;
        } else {
            $scope.signup_form.isStartBigggerThanEndError = false;
        }

    };


    // 使用者介面基本設定
    $scope.vm.isEdit = true;

    $scope.vm.theNews = $rootScope.selectedObj;
    editor.setData($rootScope.selectedObj.ArticleContent);

    //驗證區塊
    $scope.submitted = false;
}]);