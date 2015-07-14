
angular.module('app', []).controller('CreateEEventsCtrl', [
    '$scope', '$state', '$rootScope', 'EEventsFactory', 'CustomersFactory', 'SalemstFactory', '$global', '$datetime',
    function ($scope, $state, $rootScope, EEventsFactory, CustomersFactory, SalemstFactory, $global, $datetime) {

        // 可取代EEvents為對應model名稱，例: EEvents --> Order

        // 宣告vm
        $scope.vm = {};
        $scope.vm.autocomplete = {};
        $scope.vm.eevent = {};
        // 宣告變數, function, object
        // $scope.vm.SingleObj = {};
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
        $scope.vm.save = function () {

            $scope.vm.eevent.VISIT_DATE = $datetime.formatDate(new Date($scope.vm.eevent.VISIT_DATE), '/');

            console.log($scope.vm.eevent);
            debugger;
            //debugger;
            if ($scope.signup_form.$valid) {
                EEventsFactory.create($scope.vm.eevent).success(function (data) {
                    $state.go('m.EEvents.plan');
                }).error(function (err) {
                    console.log(err);
                });
                alert("新增成功!!");
            } else {
                $scope.signup_form.submitted = true;
            }

        };

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
        $scope.vm.isEdit = false;

        $("#Start_Date").kendoDatePicker({
            culture: "zh-CHT",
            format: "yyyy/MM/dd"
        });
        $("#End_Date").kendoDatePicker({
            culture: "zh-CHT",
            format: "yyyy/MM/dd"
        });
        $("#Visit_Date").kendoDateTimePicker({
            culture: "zh-CHT",
            format: "yyyy/MM/dd hh:mm"
        });
        //$("#timepicker").kendoTimePicker();

    }]);