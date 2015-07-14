
angular.module('app', []).controller('ListOrdersCtrl', [
    '$scope', '$state', '$rootScope', 'OrdersFactory', '$global', '$datetime', 'ngToast','$options',
    function ($scope, $state, $rootScope, OrdersFactory, $global, $datetime,ngToast,$options) {

        // 可取代Orders為對應model名稱，例: Orders --> Order

        // 宣告vm
        $scope.vm = {};
        $scope.vm.customer = {};

        if ($global.OrderList_Start == null || $global.OrderList_End == null) {
            $scope.vm.START = $datetime.addDate(-2);
            $scope.vm.END = $datetime.newDate();
        } else {
            $scope.vm.START = $global.OrderList_Start;
            $scope.vm.END = $global.OrderList_End;
        }
         //將Customer帶來的客戶資料搜尋
        if ($global.selectedCustomer != null) {
            $scope.vm.START = $datetime.addDate(-30);
            $scope.vm.END = $datetime.newDate();
            $scope.vm.customer.CUST_NAME = $global.selectedCustomer.CUST_NAME;
            fetchData($scope.vm.START, $scope.vm.END);
            $global.selectedCustomer=null;

        } else {
            // 取得data填充ui grid
            $scope.vm.START = $datetime.addDate(-2);
            $scope.vm.END = $datetime.newDate();
            fetchData($scope.vm.START, $scope.vm.END);
        }
        // 取得data填充ui grid
        //fetchData($scope.vm.START, $scope.vm.END);

        // 從m.Customre.edit 跳轉
        //$scope.vm.customerSearch = $global.seletedCustomer;

        // 動作
        // 轉到新增頁面
        $scope.vm.goToCreateForm = function () {
            $state.go('m.Orders.create');
        };
        // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
        $scope.goToUpdateForm = function (obj) {
            $rootScope.selectedObj = obj;
            $global.selectedOrder = obj;
            $state.go("m.Orders.edit");
        };
        $scope.goToDeleteForm = function (obj) {
            $rootScope.selectedObj = obj;
            $state.go("m.Orders.delete");
        };

        // 動作
        // 根據時間撈取資料
        $scope.vm.fetchData = function () {
            fetchData($scope.vm.START, $scope.vm.END);
        };
        ;


        // 使用者介面基本設定
        $scope.gridOptions = {};
        $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
        $scope.gridOptions.columnDefs = [
           { name: 'Edit', displayName: '修改', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button></div> ', width: 100, pinnedLeft: true },
           { name: 'DATE_SALE', displayName: '日期', width: 120 },
           { name: 'VOU_SALE', displayName: '傳票號碼', width: 120 },
           { name: 'CUST_ID', displayName: '客戶代號', width: 120 },
           { name: 'CUST_NAME', displayName: '客戶名稱', width: 120 },
           { name: 'SALE_ID', displayName: '業務代號', width: 120 },
           { name: 'SALE_NAME', displayName: '業務名稱', width: 120 },
           { name: 'STAT_MARK_TITLE', displayName: '狀態', width: 120 },
        ];


        //$("#Start_Date").kendoDatePicker({
        //    culture: "zh-CHT",
        //    format: "yyyy/MM/dd"
        //});
        //$("#End_Date").kendoDatePicker({
        //    culture: "zh-CHT",
        //    format: "yyyy/MM/dd"
        //});

        function fetchData(start, end) {
            $("#loading").fadeIn("fast");

            //var objstart = $datetime.startTime(start)
            //var objend = $datetime.endTime(end);
            var objstart = $datetime.startTime2(start)
            var objend = $datetime.endTime2(end);

            $global.OrderList_Start = $scope.vm.START;
            $global.OrderList_End = $scope.vm.END;

            // 判斷是否有輸入 客戶名稱 (模糊搜尋)
            if ($scope.vm.customer.CUST_NAME == null || typeof $scope.vm.customer.CUST_NAME == 'undefined') {
                // 無輸入客戶名稱
                $scope.vm.customer.CUST_NAME = '';
            }

            fetchDataByDateAndCustomer(objstart, objend, $scope.vm.customer.CUST_NAME);
        }

        function fetchDataByDate(objstart, objend) {
            
            OrdersFactory.getByDateInterval(objstart, objend).success(function (data) {

                if (data.length == 0) {
                    $("#loading").fadeOut("fast");
                    alert("查無資料");
                    return;
                }

                for (var i = 0; i < data.length; i++) {
                    if (data[i].RECEIPT_PHOTO == '' || data[i].RECEIPT_PHOTO == null) {
                        data[i].IsReceiveMoney = '未收帳';
                    } else {
                        data[i].IsReceiveMoney = '已收帳';
                    }
                }

                var toastStr = '載入資料' + data.length + '筆成功';
                ngToast.create({
                    className: 'my_alert my_alert_danger',
                    content: toastStr
                });

                $scope.gridOptions.data = data;
                $("#loading").fadeOut("fast");
                //$global.OrderList = data;
            }).error(function (err) {
                console.log(err);
            });
        }

        function fetchDataByDateAndCustomer(objstart, objend, cname) {
            
            OrdersFactory.getByDateIntervalAndCustomer(objstart, objend, cname).success(function (data) {

                if (data.length == 0) {
                    $("#loading").fadeOut("fast");
                    alert("查無資料");
                    return;
                }

                for (var i = 0; i < data.length; i++) {
                    if (data[i].STAT_MARK == '0') {
                        data[i].STAT_MARK_TITLE = $options.STAT_MARK[0].text;
                    }
                    if (data[i].STAT_MARK == '1') {
                        data[i].STAT_MARK_TITLE = $options.STAT_MARK[1].text;
                    }
                    if (data[i].STAT_MARK == '3') {
                        data[i].STAT_MARK_TITLE = $options.STAT_MARK[2].text;
                    }
                    if (data[i].STAT_MARK == '4') {
                        data[i].STAT_MARK_TITLE = $options.STAT_MARK[3].text;
                    }
                    if (data[i].STAT_MARK == '*') {
                        data[i].STAT_MARK_TITLE = $options.STAT_MARK[4].text;
                    }
                    if (data[i].STAT_MARK == 'Y') {
                        data[i].STAT_MARK_TITLE = $options.STAT_MARK[5].text;
                    }
                }

                var toastStr = '載入資料' + data.length + '筆成功';
                ngToast.create({
                    className: 'my_alert my_alert_danger',
                    content: toastStr
                });

                $scope.gridOptions.data = data;
                $("#loading").fadeOut("fast");
                //$global.OrderList = data;
            }).error(function (err) {
                console.log(err);
            });
        }

    }]);