
angular.module('app', []).controller('ListAllCSVCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
    $scope.GoToDepartCSV = function () {
        $state.go('m.DepartCSV.list');
    };
    $scope.GoToExppriceCSV = function () {
        $state.go('m.ExppriceCSV.list');
    };
    $scope.GoToSectionCSV = function () {
        $state.go('m.SectionCSV.list');
    };
    $scope.GoToStockCSV = function () {
        $state.go('m.StockCSV.list');
    };
    $scope.GoToCustomerCSV = function () {
        $state.go('m.CustomersCSV.list');
    };
    $scope.GoToForsSaleCSV = function () {
        $state.go('m.ForSaleCSV.list');
    };
    $scope.GoToPricLockCSV = function () {
        $state.go('m.PricLockCSV.list');
    };
    $scope.GoToVouctrlCSV = function () {
        $state.go('m.VouctrlCSV.list');
    };
    $scope.GoToSalemstCSV = function () {
        $state.go('m.SalemstCSV.list');
    };
    $scope.GoToIoctrlCSV = function () {
        $state.go('m.IoctrlCSV.list');
    };
    $scope.GoToProcessCSV = function () {
        $state.go('m.ProcessCSV.list');
    };
    $scope.GoToOrdMasterHistCSV = function () {
        $state.go('m.OrdMasterHistCSV.list');
    };
    $scope.GoToOrdDetailthistCSV = function () {
        $state.go('m.OrdDetailthistCSV.list');
    };
    $scope.GoToPdacfgCSV = function () {
        $state.go('m.PdacfgCSV.list');
    };
}]);