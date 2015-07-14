
angular.module('app', []).controller('ListCategoryCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'ProductsFactory', function ($scope, $state, $rootScope, $stateParams, ProductsFactory) {

    // 可取代Products為對應model名稱，例: Products --> Order
    $("#loading").fadeIn("fast");

    // 宣告vm
    $scope.vm = {};
    $scope.vm.title = "";
    $scope.vm.bigCate = [];
    $scope.vm.medCate = [];
    $scope.vm.smallCate = [];

    // 標題Title
    if ($stateParams.type == '2') {
        $scope.vm.title = "產品管理";
    }
    else {
        $scope.vm.title = "產品查詢";
    }

    // 以大類取得中類
    $scope.vm.searchMedCate = function ($event, bigCate) {
        $(".main_category").find(".col-sm-11").removeClass("active");
        angular.element($event.target).addClass("active");
        ProductsFactory.getMedCate(bigCate).success(function (data) {
            $scope.vm.medCate = data;
        }).error(function (err) {
            console.log(err);
        });
    };

    // 以中類跳到產品列表
    $scope.vm.showProductList = function (medCate) {
        if ($stateParams.type == '2') {
            $state.go('m.Products.mlist', { cate: medCate.Id });
        }
        else {
            $state.go('m.Products.list', { cate: medCate.Id });
        }
    };

    // 取得大類
    ProductsFactory.getBigCate().success(function (data) {
        $scope.vm.bigCate = data;
        $("#loading").fadeOut("fast");
    }).error(function (err) {
        console.log(err);
    });


}]).directive('resize', function ($window) {
    function updateUI(element) {
        var height = {
            height: ($(window).height() - 200) + 'px'
        };
        element.css(height);
    }

    return function (scope, element, attr) {
        var w = angular.element($window);

        updateUI(element);

        w.on('resize', function () {
            updateUI(element);
            scope.$apply();
        });
    };
});