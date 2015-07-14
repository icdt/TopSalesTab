
angular.module('app', []).controller('CreateCustomersCtrl', [
    '$scope', '$state', '$rootScope', 'CustomersFactory', 'SalemstFactory', '$global', '$options',
    function ($scope, $state, $rootScope, CustomersFactory, SalemstFactory, $global, $options) {

        // 可取代Customers為對應model名稱，例: Customers --> Order

        // 宣告vm
        $scope.vm = {};
        $scope.vm.autocomplete = {};
        $scope.select = {};         // 下拉選單
        //驗證區塊
        $scope.submitted = false;

        // 宣告變數, function, object
        //$scope.vm.customer = {};

        // 動作
        $scope.vm.save = function () {
            //debugger;
            console.log($scope.vm.customer);
            //debugger;

            if ($scope.signup_form.$valid) {

                CustomersFactory.create($scope.vm.customer).success(function (data) {
                    alert("新增成功!!");
                    $state.go('m.Customers.list');
                }).error(function (err) {
                    alert(err.Message);
                    console.log(err);
                });
                
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
        $scope.vm.isEdit = false;


    }]);