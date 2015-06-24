
angular.module('app', []).controller('EditOrdersCtrl', [
    '$scope', '$state', '$rootScope', 'OrdersFactory',
    function ($scope, $state, $rootScope, OrdersFactory) {

        // 可取代Orders為對應model名稱，例: Orders --> Order

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.singleObj = {};

        //狀態
        $scope.vm.order_status = {
            dataSource: {
                data: [{ id: 0, name: '未收款' },
                       { id: 1, name: '已收款' }]
            },
            dataTextField: "name",
            dataValueField: "id",
            optionLabel: "請選擇狀態"
        };

        //最後儲存日期時間
        $("#Stored_Date").kendoDatePicker({
            culture: "zh-CHT",
            format: "yyyy/MM/dd"
        });

        // 動作
        // 儲存
        $scope.vm.save = function () {
            OrdersFactory.update($scope.vm.singleObj).success(function (data) {

                $state.go('m.Orders.list');
            }).error(function (err) {
                console.log(err);
            });
        };
        // 刪除
        $scope.vm.remove = function () {
            OrdersFactory.remove($scope.vm.singleObj).success(function (data) {

                $state.go('m.Orders.list');
            }).error(function (err) {
                console.log(err);
            });
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = true;
        $scope.vm.singleObj = $rootScope.selectedObj;


    }]);

//只限輸入數字
function ValidateNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}