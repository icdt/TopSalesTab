
angular.module('app', []).controller('SalesReportsCtrl', [
    '$scope', '$state', '$stateParams', '$rootScope', 'ReportsFactory', '$datetime', 'CustomersFactory', 'ProductsFactory', 'ngToast', '$timeout',
    function ($scope, $state, $stateParams, $rootScope, ReportsFactory, $datetime, CustomersFactory, ProductsFactory, ngToast,$timeout) {

        // 可取代icdtdata為對應model名稱，例: icdtdata --> Order
        
        // 宣告vm
        $scope.vm = {};

        $scope.vm.report = {};
        $scope.autocomplete = {};

        $scope.submitted = false;   // 驗證初始化

        // 儲存        
        $scope.vm.fetchData = function () {
            
            // 表單驗證
            if ($scope.signup_form.$valid) {
                $scope.signup_form.submitted = false;
                $("#loading").fadeIn("fast");
                ReportsFactory.getCustomerOrderHistoryByProduct($scope.vm.report.CUST_ID, $scope.vm.report.PROD_ID).success(function (data) {
                    $("#loading").fadeOut("fast");
                    
                    if (data.length == 0) {
                        $scope.vm.report.DATA = 0;
                        alert("查無資料");
                        return;
                    }

                    var toastStr = '載入資料' + data.length + '筆成功，產生表格中..(約數秒)';
                    ngToast.create({
                        className: 'my_alert my_alert_danger',
                        content: toastStr
                    });
                    $timeout(function () {
                        $scope.vm.report.DATA = data;
                    }, 1000);
                }).error();

            } else {
                $scope.signup_form.submitted = true;
            }
        };

        // 開新視窗列印 的 按扭動作
        $scope.vm.printTable = function () {
            printData();
        };


        // 開新視窗列印
        function printData() {
            var divToPrint = document.getElementById('printTable2');
            var htmlToPrint = '' +
                '<style type="text/css">' +
                'table{ border-collapse: collapse; }' +
                'table th, table td {' +
                'border:1px solid #000;' +
                'padding;0.5em;' +
                '}' +
                '</style>';
            htmlToPrint += divToPrint.outerHTML;
            newWin = window.open("");
            newWin.document.write(htmlToPrint);
            newWin.print();
            newWin.close();
        }



        //autocomplete取得所有客戶項目
        //CustomersFactory.getAll().success(function (customer) {
            

        //    CustomersFactory.getAutoCompleteOptions(customer, "...").then(function (searchcustomer) {
        //        $scope.autocomplete.allCustomersName = searchcustomer;
        //    });

        //    $scope.autocomplete.fetchProductList();

        //}).error(function (err) {
        //    console.log(err);
        //});

        //autocomplete輸入字串時動作
        $scope.autocomplete.searchCustomer = function (typedthings) {
            if ($scope.vm.report.CUST_NAME == '' && typeof $scope.vm.report.CUST_NAME == 'undefined') {
                return;
            }
            if (typedthings == '' && $scope.vm.report.CUST_NAME.length > 0) {
                $scope.autocomplete.isSearchCustomer = true;
                CustomersFactory.getByName($scope.vm.report.CUST_NAME).success(function (data) {
                    if (data.length == 0) {
                        $scope.autocomplete.isSearchCustomer = false;
                        return;
                    }
                    CustomersFactory.getAutoCompleteOptions(data, typedthings).then(function (item) {
                        $scope.autocomplete.allCustomersName = item;
                        $scope.autocomplete.isSearchCustomer = false;
                        return;
                    });
                }).error();
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
                $scope.vm.report.CUST_ID = aa.CUST_ID;
            }).error();
        }

        //autocomplete取得所有產品項目
        //$scope.autocomplete.fetchProductList = function () {
        //    ProductsFactory.getAllSimple().success(function (sale) {
        //        ProductsFactory.getAutoCompleteOptions(sale, "...").then(function (searchsale) {
        //            $scope.autocomplete.allProductsName = searchsale;
        //        });
        //    }).error(function (err) {
        //        console.log(err);
        //    });
        //};

        //autocomplete輸入字串時動作
        $scope.autocomplete.searchProduct = function (typedthings) {
            if (typedthings == '' && typeof $scope.vm.report.PROD_NAME == 'undefined') {
                return;
            }
            $scope.autocomplete.isSearchProduct = true;
            ProductsFactory.getByName(typedthings).success(function (data) {
                if (data.length == 0) {
                    $scope.autocomplete.isSearchProduct = false;
                    return;
                }
                ProductsFactory.getAutoCompleteOptions(data, typedthings).then(function (item) {
                    $scope.autocomplete.allProductsName = item;
                    $scope.autocomplete.isSearchProduct = false;
                });
            }).error();
        }

        //autocomplete選擇動作
        $scope.autocomplete.assignProduct = function (suggestion) {
            ProductsFactory.getByName(suggestion).success(function (sale) {
                var aa = _.find(sale, function (item) {
                    return item.PROD_NAME == suggestion;
                });
                $scope.vm.report.PROD_ID = aa.PROD_ID;
            }).error();
        }

    }]);