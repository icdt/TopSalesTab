
angular.module('app', []).controller('EditEEventsCtrl', [
    '$scope', '$state', '$rootScope', 'EEventsFactory','$datetime', 'CustomersFactory', 'SalemstFactory','$global',
    function ($scope, $state, $rootScope, EEventsFactory, $datetime, CustomersFactory, SalemstFactory,$global) {

    // 可取代EEvents為對應model名稱，例: EEvents --> Order

    // 宣告vm
    $scope.vm = {};

    // 宣告變數, function, object
    $scope.vm.eevent = {};
    $scope.vm.autocomplete = {};
    //驗證區塊
    $scope.submitted = false;

    if ($global.theCustomer_CUST_ID != null) {
        $scope.vm.eevent.CUST_ID = $global.theCustomer_CUST_ID;
        $global.theCustomer_CUST_ID = null;
    }
    if ($global.theCustomer_CUST_NAME != null) {
        $scope.vm.eevent.CUST_NAME = $global.theCustomer_CUST_NAME;
        $global.theCustomer_CUST_NAME = null;
    }
    if ($global.theSALE_ID != null) {
        $scope.vm.eevent.EMP_ID = $global.theSALE_ID;
        $global.theSALE_ID = null;
    }
    if ($global.theSALE_NAME != null) {
        $scope.vm.eevent.EMP_NAME = $global.theSALE_NAME;
        $global.theSALE_NAME = null;
    }



        // 動作
        
    //    //判斷start時間是否變更
    //$scope.vm.upstarttime = function () {
    //    debugger;
    //    $scope.vm.eevent.START_TIME = $datetime.formatTime2(new Date($rootScope.selectedObj.START_TIME), ':');
    //};
    //    //判斷end時間是否變更
    //$scope.vm.upendtime = function () {

    //    $scope.vm.eevent.END_TIME = $datetime.formatTime2(new Date($rootScope.selectedObj.END_TIME), ':');
    //};

    // 儲存
    //$scope.vm.save = function () {
    //    $scope.vm.eevent.VISIT_DATE = $datetime.formatDate(new Date($rootScope.selectedObj.VISIT_DATE), '/');
       
        
    //    //$scope.vm.eevent.START_TIME = $datetime.formatTime2(new Date($rootScope.selectedObj.START_TIME), ':');
    //    //console.log($scope.vm.eevent.START_TIME);
    //    //debugger;
    //    //$scope.vm.eevent.END_TIME = $datetime.formatTime2(new Date($rootScope.selectedObj.END_TIME), ':');

    //    EEventsFactory.update($scope.vm.eevent).success(function (data) {
          

    //        $state.go('m.EEvents.plan');
    //    }).error(function (err) {
    //        console.log(err);
    //    });
    //};

        // 動作
    $scope.vm.save = function () {

        $scope.vm.eevent.VISIT_DATE = $datetime.formatDate(new Date($scope.vm.eevent.VISIT_DATE), '/');

        //console.log($scope.vm.eevent);
        //debugger;
        //debugger;
        if ($scope.signup_form.$valid) {
            EEventsFactory.update($scope.vm.eevent).success(function (data) {
                $state.go('m.EEvents.plan');
            }).error(function (err) {
                console.log(err);
            });
            alert("修改成功!!");
        } else {
            $scope.signup_form.submitted = true;
        }

    };


    // 刪除
    $scope.vm.remove = function () {
        EEventsFactory.remove($scope.vm.eevent).success(function (data) {

            $state.go('m.EEvents.plan');
        }).error(function (err) {
            console.log(err);
        });
    };
    

        //取得所有客戶項目
    //CustomersFactory.getAll().success(function (customer) {
    //    //console.log(customer);
    //    //debugger;
    //    CustomersFactory.getAutoCompleteOptions(customer, "...").then(function (searchcustomer) {
    //        //console.log(searchcustomer);
    //        //debugger;
    //        $scope.vm.autocomplete.allCustomersName = searchcustomer;
    //    });
    //}).error(function (err) {
    //    console.log(err);
    //});

        //autocomplete輸入字串時動作
    $scope.autocomplete.searchCustomer = function (typedthings) {
        if (typedthings == '' && typeof $scope.vm.eevent.CUST_NAME == 'undefined') {
            return;
        }
        $scope.autocomplete.isSearchCustomer = true;
        CustomersFactory.getByName(typedthings).success(function (data) {
            if (data.length == 0) {
                $scope.autocomplete.isSearchCustomer = false;
                return;
            }
            CustomersFactory.getAutoCompleteOptions(data, typedthings).then(function (item) {
                $scope.autocomplete.allCustomersName = item;
                $scope.autocomplete.isSearchCustomer = false;
            });
        }).error();
    }

        //autocomplete選擇動作
    $scope.autocomplete.assignCustomer = function (suggestion) {
        CustomersFactory.getByName(suggestion).success(function (customer) {
            var aa = _.find(customer, function (item) {
                return item.CUST_NAME == suggestion;
            });
            $scope.vm.eevent.CUST_NAME = aa.CUST_NAME;
            $scope.vm.eevent.CUST_ID = aa.CUST_ID;
        }).error();
    }

        //autocomplete Salesman 輸入字串時動作
    $scope.autocomplete.searchSalesman = function (typedthings) {
        if (typedthings == '' && typeof $scope.vm.eevent.SALE_NAME == 'undefined') {
            return;
        }
        $scope.autocomplete.isSearchSalesman = true;
        SalemstFactory.getByName(typedthings).success(function (data) {
            if (data.length == 0) {
                $scope.autocomplete.isSearchSalesman = false;
                return;
            }
            SalemstFactory.getAutoCompleteOptions(data, typedthings).then(function (item) {
                $scope.autocomplete.allSalesman = item;
                $scope.autocomplete.isSearchSalesman = false;
            });
        }).error(function () {
            $scope.autocomplete.isSearchSalesman = false;
        });
    };

        //autocomplete Salesman 選擇動作
    $scope.autocomplete.assignSalesman = function (suggestion) {
        SalemstFactory.getByName(suggestion).success(function (data) {
            var aa = _.find(data, function (item) {
                return item.EMP_NAME == suggestion;
            });
            $scope.vm.eevent.EMP_NAME = aa.EMP_NAME;    // only Salesman name
            $scope.vm.eevent.EMP_ID = aa.EMP_ID;    // only Salesman name
        }).error();
    };



    // 使用者介面基本設定
    $scope.vm.isEdit = true;
    $scope.vm.eevent = $rootScope.selectedObj;
    $scope.vm.eevent.VISIT_DATE = $datetime.formatDate(new Date($rootScope.selectedObj.VISIT_DATE), '/');
    console.log($rootScope.selectedObj);
    
  


}]);