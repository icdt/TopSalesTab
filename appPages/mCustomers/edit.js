
angular.module('app', []).controller('EditCustomersCtrl', [
    '$scope', '$state', '$rootScope', 'CustomersFactory', '$global', 'VouSaleFactory', 'SalemstFactory','OrdersFactory','$options',
    function ($scope, $state, $rootScope, CustomersFactory, $global, VouSaleFactory, SalemstFactory, OrdersFactory,$options) {

        // 可取代Customers為對應model名稱，例: Customers --> Order

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.customer = {};
        $scope.vm.autocomplete = {};
        $scope.select = {};         // 下拉選單

        //驗證區塊
        $scope.submitted = false;
        $scope.vm.save = function () {
            //debugger;
            console.log($scope.vm.customer);
            //debugger;

            if ($scope.signup_form.$valid) {

                CustomersFactory.update($scope.vm.customer).success(function (data) {
                    $state.go('m.Customers.list');
                }).error(function (err) {
                    console.log(err);
                });
                alert("修改成功!!");
            } else {
                $scope.signup_form.submitted = true;
            }
        };


        //autocomplete Salesman 輸入字串時動作
        $scope.autocomplete.searchSalesman = function (typedthings) {
            if (typedthings == '' && typeof $scope.vm.customer.SALE_NAME == 'undefined') {
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
                    return item.SALE_NAME == suggestion;
                });
                $scope.vm.customer.SALE_NAME = aa.EMP_NAME;    // only Salesman name
                $scope.vm.customer.SALE_ID = aa.EMP_ID;    // only Salesman name
            }).error();
        };





        // 刪除
        $scope.vm.remove = function () {
            CustomersFactory.remove($scope.vm.customer).success(function (data) {

                $state.go('m.Customers.list');
            }).error(function (err) {
                console.log(err);
            });
        };

        //加入行程
        $scope.vm.addEevent = function () {
            $global.selectedCustomer = $scope.vm.customer;
            $state.go("m.EEvents.create");
        };
        //查詢行程
        $scope.vm.searchEEvent = function () {
            $global.selectedCustomer = $scope.vm.customer;
            console.log($global.selectedCustomer);
            $state.go("m.EEvents.plan");
        };
        //查詢訂單記錄
        $scope.vm.searchOrder = function () {
            $global.selectedCustomer = $scope.vm.customer;
            $state.go("m.Orders.list");
        };
        //建立訂單
        $scope.vm.createOrder = function (data) {

            var ppObj = {
                CUST_ID: $scope.vm.customer.CUST_ID,
                SALE_ID: $global.loginUser.EMP_ID == null ? null : $global.loginUser.EMP_ID
            };

            VouSaleFactory.getNewVouSaleByOrdMaster().success(function (obj) {
                ppObj.VOU_SALE = obj;
                $global.selectedOrder = OrdersFactory.preparePostObj(ppObj);
                $global.selectedCustomer = $scope.vm.customer;

                $state.go('m.Products.category');
            }).error(function (err) {
                console.log(err);
            });


        };

        //下拉選單
        $scope.select.INVO_TYPE = {
            dataSource: {
                data: $options.INVO_TYPE       // 選項
            },
            dataTextField: "text",
            dataValueField: "value"
        };

        $scope.select.NC_MARK = {
            dataSource: {
                data: $options.NC_MARK       // 選項
            },
            dataTextField: "text",
            dataValueField: "value"
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = true;
        $scope.vm.customer = $rootScope.selectedObj;
        $scope.vm.customer.SALE_NAME = $global.theSALE_NAME;
        $scope.vm.customer.TEL = parseInt($rootScope.selectedObj.TEL, 10);

    }]);