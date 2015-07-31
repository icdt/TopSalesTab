
angular.module('app', []).controller('ListProductsCtrl', [
    '$scope', '$state', '$rootScope', '$stateParams', 'ProductsFactory', '$global', 'OrderDetailsFactory', 'OrdersFactory', 'CustomersFactory', 'VouSaleFactory', 'ngDialog',
    function ($scope, $state, $rootScope, $stateParams, ProductsFactory, $global, OrderDetailsFactory, OrdersFactory, CustomersFactory, VouSaleFactory, ngDialog) {

        // 可取代Products為對應model名稱，例: Products --> Order
        $("#loading").fadeIn("fast");

        // 宣告vm
        $scope.vm = {};
        $scope.vm.addProduct = {};
        $scope.vm.autocomplete = {};
        $scope.vm.autocompleteSelect = null;
        $scope.vm.addToCart = function (data) {
            if (data.QTYI > 0 || data.QTYF > 0) {
                if (data.QTYI == null || typeof (data.QTYI) == "undefined" || data.QTYI == "") {
                    data.QTYI = 0;
                }
                if (data.QTYF == null || typeof (data.QTYF) == "undefined" || data.QTYF == "") {
                    data.QTYF = 0;
                }

                if ($global.selectedCustomer == null) {
                    $scope.vm.addProduct = data;

                    ngDialog.open({
                        scope: $scope,
                        template: 'selectCustomer.html'
                    });
                }
                else {
                    var newItem = OrderDetailsFactory.preparePostObj($global.newOrder, data);

                    $global.addToCart(newItem);

                    // 更新購物車數量
                    $scope.$emit('updateCartCount', '');
                }
            } else {
                alert("請輸入購買數量");
            }
        };

        $scope.vm.addToCustomerToCart = function () {
            if ($scope.vm.autocompleteSelect) {
                var ppObj = {
                    CUST_ID: $scope.vm.selectedCustomer.CUST_ID,
                    SALE_ID: typeof $global.loginUser.EMP_ID == 'undefined' ? null : $global.loginUser.EMP_ID
                };

                VouSaleFactory.getNewVouSaleByOrdMaster().success(function (obj) {
                    ppObj.VOU_SALE = obj;
                    $global.newOrder = OrdersFactory.preparePostObj(ppObj);
                    $global.selectedCustomer = $scope.vm.selectedCustomer;

                    // 已選產品
                    var newItem = OrderDetailsFactory.preparePostObj($global.newOrder, $scope.vm.addProduct);

                    $global.addToCart(newItem);

                    // 更新購物車數量
                    $scope.$emit('updateCartCount', '');

                }).error(function (err) {
                    console.log(err);
                });

                ngDialog.close();
            }
            else {
                alert("請選擇客戶");
            }
        }

        //autocomplete 客戶 輸入字串時動作
        $scope.autocomplete.searchCustomer = function (typedthings) {
            if (typedthings == '' && typeof $scope.vm.autocompleteSelect == 'undefined') {
                return;
            }
            $scope.autocomplete.isSearchCustomer = true;
            CustomersFactory.getByName(typedthings).success(function (customer) {
                CustomersFactory.getAutoCompleteOptions(customer, typedthings).then(function (searchcustomer) {
                    $scope.autocomplete.allCustomersName = searchcustomer;
                    $scope.autocomplete.isSearchCustomer = false;
                });
            }).error();
        };

        //autocomplete 客戶 選擇動作
        $scope.autocomplete.assignCustomer = function (suggestion) {
            debugger;
            CustomersFactory.getByName(suggestion).success(function (customer) {
                var aa = _.find(customer, function (item) {
                    return item.CUST_NAME == suggestion;
                });
                $scope.vm.autocompleteSelect = aa.CUST_NAME;    // only customer name
                $scope.vm.selectedCustomer = aa; // customer obj
            }).error();
        };

        ProductsFactory.getProductsByCate($stateParams.cate).success(function (data) {
            $scope.vm.products = ProductsFactory.transformData(data);
            $("#loading").fadeOut("fast");

        }).error(function (err) {
            console.log(err);
        });

        // 動作
        $scope.goToDetail = function (ppProductId) {
            $rootScope.selectedObj = ppProductId;
            $global.selectedProduct = _.find($scope.vm.products, function (item) { return item.PROD_ID == ppProductId });
            $state.go("m.Products.detail", { productId: ppProductId });
        };

    }]);

//只限輸入數字
function ValidateNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}