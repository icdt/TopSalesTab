
angular.module('app', []).controller('PlanEEventsCtrl', [
    '$scope', '$state', '$rootScope', 'EEventsFactory', '$global', '$datetime',
    function ($scope, $state, $rootScope, EEventsFactory, $global, $datetime) {

        // 可取代EEvents為對應model名稱，例: EEvents --> Order

        // 宣告vm
        $scope.vm = {};
        $scope.vm.customer = {};

        // 指定查詢時間時間，考慮使用者是否已選過時間
        if ($global.EeventList_Start == null || $global.EeventList_End == null) {
            $scope.vm.START = $datetime.addDate(-2);
            $scope.vm.END = $datetime.newDate();
        } else {
            $scope.vm.START = $global.EeventList_Start;
            $scope.vm.END = $global.EeventList_End;
        }
        //將Customer帶來的客戶資料搜尋
        if ($global.selectedCustomer != null) {
            $scope.vm.START = $datetime.addDate(-30);
            $scope.vm.END = $datetime.newDate();
            $scope.vm.customer.CUST_NAME = $global.selectedCustomer.CUST_NAME;
            fetchData($scope.vm.START, $scope.vm.END);
            $global.selectedCustomer=null;

        } else {
            $scope.vm.START = $datetime.addDate(-2);
            $scope.vm.END = $datetime.newDate();
            // 取得data填充ui grid
            fetchData($scope.vm.START, $scope.vm.END);
           
        }
        

        // 根據時間撈取資料
        $scope.vm.fetchData = function () {
            fetchData($scope.vm.START, $scope.vm.END);
        };
        

        // 轉到新增頁面
        $scope.vm.goToCreateForm = function () {
            $state.go('m.EEvents.create');
        };
        //驗證區塊
        $scope.submitted = false;
        //判斷起始時間不得大於結束時間
        //$scope.vm.compareStartEnd = function () {

        //    if (new Date($scope.vm.START) >= new Date($scope.vm.END)) {
        //        $scope.signup_form.isStartBigggerThanEndError = true;
        //    } else {
        //        $scope.signup_form.isStartBigggerThanEndError = false;
        //    }

        //};

        // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
        $scope.goToUpdateForm = function (obj) {
            obj.START_TIME = new Date("2015/01/01 " + obj.START_TIME + ":00");
            obj.END_TIME = new Date("2015/01/01 " + obj.END_TIME + ":00");
            $rootScope.selectedObj = obj;
            console.log(obj);
            debugger;
            $state.go("m.EEvents.edit");
        };

        // 使用者介面基本設定
        $scope.gridOptions = {};
        $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
        $scope.gridOptions.columnDefs = [
           { name: 'Edit', displayName: '修改', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button></div> ', width: 100, pinnedLeft: true },
           { name: 'TITLE', displayName: '工作名稱', width: 150 },
           { name: 'VISIT_DATE', displayName: '拜訪日期', cellFilter: 'date:"yyyy/MM/dd"', width: 150 },
           { name: 'START_TIME', displayName: '開始時間', width: 120 },
           { name: 'END_TIME', displayName: '結束時間', width: 120 },
           { name: 'CUST_NAME', displayName: '客戶名稱', width: 200 },
           { name: 'EMP_NAME', displayName: '業務名稱', width: 150 },
           { name: 'PLAN', displayName: '規劃', width: 120 },
           { name: 'CONTENT', displayName: '訪談記錄', width: 120 }
        ];

        function fetchData(start, end) {
            $("#loading").fadeIn("fast");

            var objstart = $datetime.startTime(start)
            var objend = $datetime.endTime(end);

            $global.EeventList_Start = $scope.vm.START;
            $global.EeventList_End = $scope.vm.END;

            if ($scope.vm.customer.CUST_NAME == null || typeof $scope.vm.customer.CUST_NAME == 'undefined') {
                $scope.vm.customer.CUST_NAME = '';
            }
            EEventsFactory.getByDateIntervalAndCustomer(objstart, objend, $scope.vm.customer.CUST_NAME).success(function (data) {
                if (data.length == 0) {
                    alert("無行程資料");
                    $("#loading").fadeOut("fast");
                    return;
                }
                $scope.gridOptions.data = data;
                $("#loading").fadeOut("fast");
            }).error(function (err) {
                console.log(err);
            });
        }
        


    }]);
