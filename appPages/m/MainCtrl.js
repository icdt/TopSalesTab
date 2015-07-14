app.controller('MainCtrl', ['$scope', '$rootScope', '$global', '$state', 'User', 'ngDialog','CustomersFactory','VouSaleFactory','OrdersFactory',
    function ($scope, $rootScope, $global, $state, User, ngDialog,CustomersFactory,VouSaleFactory,OrdersFactory) {
        alert("in m");

        $("#loading").fadeOut("fast");
        $scope.vm = {};
        $scope.autocomplete = {};

        // $scope.$on('updateCartCount', function (e, data) {
        //     $scope.vm.cartNo = $global.cart.length;
        // });

        // $scope.vm.createNewOrder = function () {
        //     ngDialog.open({
        //         scope: $scope,
        //         template: 'selectCustomer.html'
        //     });
        // };

        // //autocomplete 客戶 輸入字串時動作
        // $scope.autocomplete.searchCustomer = function (typedthings) {
        //     if (typedthings == '' && typeof $scope.vm.autocompleteSelect == 'undefined') {
        //         return;
        //     }
        //     $scope.autocomplete.isSearchCustomer = true;
        //     CustomersFactory.getByName(typedthings).success(function (data) {
        //         if (data.length == 0) {
        //             $scope.autocomplete.isSearchCustomer = false;
        //             return;
        //         }
        //         CustomersFactory.getAutoCompleteOptions(data, typedthings).then(function (item) {
        //             $scope.autocomplete.allCustomersName = item;
        //             $scope.autocomplete.isSearchCustomer = false;
        //         });
        //     }).error(function () {
        //         $scope.autocomplete.isSearchCustomer = false;
        //     });
        // };

        // //autocomplete 客戶 選擇動作
        // $scope.autocomplete.assignCustomer = function (suggestion) {
        //     CustomersFactory.getByName(suggestion).success(function (customer) {
        //         var aa = _.find(customer, function (item) {
        //             return item.CUST_NAME == suggestion;
        //         });
        //         $scope.vm.autocompleteSelect = aa.CUST_NAME;    // only customer name
        //         $scope.vm.selectedCustomer = aa; // customer obj
        //     }).error();
        // };

        // $scope.vm.addToCustomerToCart = function () {
        //     if ($scope.vm.autocompleteSelect) {
        //         var ppObj = {
        //             CUST_ID: $scope.vm.selectedCustomer.CUST_ID,
        //             SALE_ID: typeof $global.loginUser.EMP_ID == 'undefined' ? null : $global.loginUser.EMP_ID
        //         };

        //         VouSaleFactory.getNewVouSaleByOrdMaster().success(function (obj) {
        //             ppObj.VOU_SALE = obj;
        //             $global.newOrder = OrdersFactory.preparePostObj(ppObj);
        //             $global.selectedCustomer = $scope.vm.selectedCustomer;

        //             // 還沒選產品
        //             //var newItem = OrderDetailsFactory.preparePostObj($global.selectedOrder, data);

        //             //$global.addToCart(newItem);

        //             // 更新購物車數量
        //             //$scope.$emit('updateCartCount', '');

        //             //跳到產品選擇畫面
        //             $state.go('m.Products.category');
        //         }).error(function (err) {
        //             console.log(err);
        //         });

        //         ngDialog.close();
        //     }
        //     else {
        //         alert("請選擇客戶");
        //     }
        // }
       

        // $scope.vm.goToOrderForm = function () {
        //     if ($global.newOrder == null) {
        //         alert("請先新建訂單");
        //         return;
        //     }
        //     $state.go('m.Orders.create');
        // };

        // $scope.vm.logout = function () {
        //     $global.resetAllProperty();
        //     User.removeAuthentication();
        //     $state.go('login');
        // };


    }]);

