
angular.module('app', []).controller('DetailNewsCtrl', [
    '$scope', '$state', '$rootScope', 'NewsFactory', '$timeout', '$datetime', '$global', '$sce',
    function ($scope, $state, $rootScope, NewsFactory, $timeout, $datetime, $global,$sce) {
   
    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.theNews = {};
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.vm.theNews = $global.selectedNews;

   
}]);