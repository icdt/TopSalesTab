
angular.module('app', []).controller('CreateNewsCtrl', [
    '$scope', '$state', '$rootScope', 'NewsFactory', '$timeout', '$datetime',
    function ($scope, $state, $rootScope, NewsFactory, $timeout, $datetime) {
        debugger;

        // 可取代News為對應model名稱，例: News --> Order


        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.theNews = {};
        // 動作
        // 儲存
        $scope.vm.save = function () {
           
            if ($scope.signup_form.$valid) {
                $scope.vm.theNews.ArticleContent = editor.getData();
                NewsFactory.create($scope.vm.theNews).success(function (data) {
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
            NewsFactory.remove($scope.vm.theNews).success(function (data) {

                $state.go('m.News.list');
            }).error(function (err) {
                console.log(err);
            });
        };

        $scope.vm.compareStartEnd = function () {

            if (new Date($scope.vm.theNews.StartTime) >= new Date($scope.vm.theNews.EndTime)) {
                $scope.signup_form.isStartBigggerThanEndError = true;
            } else {
                $scope.signup_form.isStartBigggerThanEndError = false;
            }

        };


        // 使用者介面基本設定
        $scope.vm.isEdit = false;

        $scope.vm.theNews.StartTime = $datetime.formatDate($datetime.newDate(), "/");
        $scope.vm.theNews.EndTime = $datetime.formatDate($datetime.addDate(14), "/");
        //驗證區塊
        $scope.submitted = false;
    }]);
