angular.module('app', []).controller('CreateOrdersCtrl', [
    '$scope', '$state', '$rootScope', 'OrdersFactory', '$global', '$options','UrlHelper','fileUpload','$datetime', 'ngDialog',
    function ($scope, $state, $rootScope, OrdersFactory, $global, $options, UrlHelper, fileUpload, $datetime, ngDialog) {

        // 可取代Orders為對應model名稱，例: Orders --> Order

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.order = {};
        $scope.vm.order = $global.newOrder;

        if ($global.selectedCustomer) {
            $scope.vm.order.CUST_ID = $global.selectedCustomer.CUST_ID;
            $scope.vm.order.CUST_NAME = $global.selectedCustomer.CUST_NAME;
        }

        $scope.vm.order.SALE_ID = $global.loginUser.EMP_ID;
        $scope.vm.order.SALE_NAME = $global.loginUser.EMP_NAME;

        // 選購商品列表
        $scope.vm.order.Details = $global.getCart();
        $scope.vm.order.AMT = 0;
        angular.forEach($scope.vm.order.Details, function (item) {
            $scope.vm.order.AMT += item.UNIT_PRICE * item.QTYI + Math.round(parseInt(item.UNIT_PRICE) / parseInt(item.IPACK_QTY)) * item.QTYF;
        });

        //狀態
        $scope.vm.order_status = {
            dataSource: {
                data: $options.STAT_MARK
            },
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "請選擇狀態"
        };

        $scope.vm.removeItem = function (item) {

            _.remove($scope.vm.order.Details, function (aa) {
                return aa.PROD_ID == item.PROD_ID;
            });
            $global.cart = $scope.vm.order.Details;
            // 更新購物車數量
            $scope.$emit('updateCartCount', '');
        };

        $scope.vm.updateProductAmout = function (item) {
            for (var i = 0; i < $global.getCart().length; i++) {
                if ($global.getCart()[i].PROD_ID == item.PROD_ID) {
                    if (item.QTYI == null || typeof (item.QTYI) == "undefined" || item.QTYI == "") {
                        item.QTYI = 0;
                    }
                    if (item.QTYF == null || typeof (item.QTYF) == "undefined" || item.QTYF == "") {
                        item.QTYF = 0;
                    }
                    $global.getCart()[i].QTYI = item.QTYI;
                    $global.getCart()[i].QTYF = item.QTYF;
                }
            }
            angular.forEach($scope.vm.order.Details, function (item) {
                $scope.vm.order.AMT += item.UNIT_PRICE * item.QTYI + Math.round(parseInt(item.UNIT_PRICE) / parseInt(item.IPACK_QTY)) * item.QTYF;
            });
        };

        $scope.vm.goToProductList = function () {
            $state.go('m.Products.category', { type: 1 });
        };

        // 動作
        // 儲存
        $scope.vm.save = function () {

            if ($global.getCart().length == 0) {
                alert("請選購商品");
                return;
            }
            
            //上傳圖片
            //上傳圖片
            var file = $scope.vm.order.RECEIPT_FILE;
            if (file != null) {
                var uploadUrl = UrlHelper.prepareUrl('/api/files?owner=orders&folder=' + $scope.vm.order.VOU_SALE);
                fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {

                    // api傳回圖片路徑
                    $scope.vm.order.RECEIPT_PHOTO = data;
                    //$scope.vm.order.DATE_SALE = $datetime.yyyymmdd($scope.vm.order.DATE_SALE);
                    
                    OrdersFactory.create($scope.vm.order).success(function (data) {

                        alert("訂單新增成功");
                        $global.resetCart();
                        $global.selectedCustomer = null;
                        $global.newOrder = null;
                        $scope.$emit('updateCartCount', '');
                        $state.go('m.Orders.list');
                    }).error(function (err) {
                        console.log(err);
                    });

                }).error(function () {
                    alert('上傳錯誤');
                });
            }
            else {
                $scope.vm.order.RECEIPT_PHOTO = $scope.vm.order.RECEIPT_BASE64;

                OrdersFactory.create($scope.vm.order).success(function (data) {
                    alert("訂單新增成功");
                    $global.resetCart();
                    $global.selectedCustomer = null;
                    $global.newOrder = null;
                    $scope.$emit('updateCartCount', '');
                    $state.go('m.Orders.list');
                }).error(function (err) {
                    console.log(err);
                });

            }
        };

        // 取消訂單: 只移除seletedOrder
        $scope.vm.cancel = function () {
            if (confirm("此訂單尚未儲存，請問是否要取消 ?")) {
                $global.seletedOrder = null;
                $global.resetCart();
                $scope.$emit('updateCartCount', '');
                $state.go('m.Products.category');
            }
        };

        $scope.vm.returnToList = function () {
            $global.resetCart();
            $scope.$emit('updateCartCount', '');
            $state.go('m.Orders.list');
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = false;
        $scope.handleFileImg = function (evt) {
            evt = evt || window.event;
            readBase64(evt, $scope);
        };

        // 顯示圖片
        function readBase64(evt, $scope) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.vm.order.RECEIPT_BASE64 = evt.target.result;
                    //callbackobj.imageFix64 = evt.target.result.substr(evt.target.result.indexOf(',') + 1);
                });
            };
            reader.readAsDataURL(file);
        }

        //彈出圖片
        $scope.clickToOpen = function () {
            if ($scope.vm.order.RECEIPT_BASE64 == null || typeof ($scope.vm.order.RECEIPT_BASE64) == 'undefined') {
                alert('無收據圖片');
                return;
            }
            ngDialog.open({
                scope: $scope,
                template: 'showImg.html'
            });
        };
        

    }]);