
angular.module('app', []).controller('ListCategoryCtrl', [
    '$scope', '$state', '$rootScope', '$stateParams', 'ProductsFactory',
    function ($scope, $state, $rootScope, $stateParams, ProductsFactory) {

        // 可取代Products為對應model名稱，例: Products --> Order

        // 宣告vm
        $scope.vm = {};

        // 動作
        //產品與庫存管理-查詢結果      
        $scope.goToProductsList = function (obj) {
            if ($stateParams.type == '2') {
                $state.go("m.Products.mlist");
            }
            else {
                $state.go("m.Products.list");
            }          
        };

        // 取得data填充ui grid
        ProductsFactory.getAll().success(function (data) {
            $scope.gridOptions.data = data;
        }).error(function (err) {
            console.log(err);
        });


    }]).directive('resize', function ($window) {
        function updateUI(element) {
            var height = {
                height: ($(window).height()-250) + 'px'
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