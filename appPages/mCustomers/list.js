
angular.module('app', []).controller('ListCustomersCtrl', [
    '$scope', '$state', '$rootScope', 'CustomersFactory', '$global', 'OrdersFactory','VouSaleFactory','SalemstFactory',
    function ($scope, $state, $rootScope, CustomersFactory, $global, OrdersFactory, VouSaleFactory, SalemstFactory) {

    // 可取代Customers為對應model名稱，例: Customers --> Order
    $("#loading").fadeIn("fast");

    // 宣告vm
    $scope.vm = {};

    // 動作
    // 轉到新增頁面
    $scope.createOrder = function (item) {

        $global.newOrder = null;
        // 更新購物車數量
        $scope.$emit('updateCartCount', '');

        var ppObj = {
            CUST_ID: item.CUST_ID,
            SALE_ID: $global.loginUser.EMP_ID
        };

        VouSaleFactory.getNewVouSaleByOrdMaster().success(function (data) {
            ppObj.VOU_SALE = data;
            $global.newOrder = OrdersFactory.preparePostObj(ppObj);
        }).error(function (err) {
            console.log(err);
        });

        $global.selectedCustomer = item;

        $state.go('m.Products.category', {type: 1});
    };
    // ui-grid修改按鈕事件, 寫在columnDefs中, 似乎無法用vm
    $scope.goToUpdateForm = function (obj) {
        $global.theCustomer_CUST_NAME = obj.CUST_NAME;
        $global.theCustomer_CUST_ID = obj.CUST_ID;
        $global.theSALE_ID = obj.SALE_ID;
        $rootScope.selectedObj = obj;
        console.log(obj);
        //debugger;
        //取得業務員名稱
        SalemstFactory.getOne(obj.SALE_ID).success(function (data) {
            console.log(data);
            //debugger;
            $global.theSALE_NAME = data.EMP_NAME;
            console.log($global.theSALE_NAME);
            $state.go("m.Customers.edit");
            
        }).error(function (err) {
            console.log(err);
        });
        
    };
    $scope.goToDeleteForm = function (obj) {
        $rootScope.selectedObj = obj;
        $state.go("m.Customers.delete");
    };

    $scope.vm.searchCustomer = function () {
        if ($scope.vm.strFindCustomer == '' || typeof $scope.vm.strFindCustomer == 'undefined') {
            $scope.gridOptions.data = $scope.vm.allCustomer
        } else {
            var aa = [];
            _.forEach($scope.vm.allCustomer, function (item) {
                if (item.CUST_NAME.indexOf($scope.vm.strFindCustomer) > -1) {
                    aa.push(item);
                }
            });
            $scope.gridOptions.data = aa;
            
        }
    };
    //加入行程
    $scope.vm.addEevent = function () {

        $state.go("m.EEvents.create");
    }


    // 取得data填充ui grid
    CustomersFactory.getAll().success(function (data) {
        $scope.gridOptions.data = data;
        $scope.vm.allCustomer = data;
        $("#loading").fadeOut("fast");
    }).error(function (err) {
        console.log(err);
    });

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true, enableSelectAll: false };
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.columnDefs = [
       { name: 'CreateOrder', displayName: '產生訂單', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.createOrder(row.entity)" helf= >產生訂單</button></div> ', width: 120, pinnedLeft: true },
       { name: 'Edit', displayName: '編輯', cellTemplate: '<div style="text-align:center; margin-top:1px;margin-bottom:1px"><button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button></div> ', width: 100, pinnedLeft: true },
       { name: 'CUST_ID', displayName: '客戶代號', width: 150 },
       { name: 'CUST_NAME', displayName: '客戶名稱', width: 150 },
       //{ name: 'CompanyName', displayName: '公司名稱', width: 120 },
       //{ name: 'Email', displayName: 'Email', width: 220 },
       //{ name: 'Tel', displayName: '電話', width: 120 },
       //{ name: 'LastTime', displayName: '上次拜訪時間', width: 120 },
       //{ name: 'Business', displayName: '業務', width: 120 }
    ];
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {

            if ($scope.gridApi.selection.getSelectedRows().length == 0) {
                $global.theCustomer_CUST_NAME = null;
                //$rootScope.selectedCustomer = null;
                //$scope.vm.selectedCustomer = null;
                //sessionStorage['selectedCustomerId'] = '';
            } else {
                //$rootScope.selectedCustomer = row.entity;
                $global.theCustomer_CUST_NAME = row.entity.CUST_NAME;
                console.log(row.entity);
                //取得業務員名稱
                SalemstFactory.getOne(row.entity.SALE_ID).success(function (data) {

                    $global.theSALE_NAME = data.EMP_NAME;
                    console.log($global.theSALE_NAME);
                    //$state.go("m.Customers.edit");

                }).error(function (err) {
                    console.log(err);
                });

                debugger;         
            }



        });
    };
        
       
}]);