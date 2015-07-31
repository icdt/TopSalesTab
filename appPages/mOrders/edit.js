
angular.module('app', []).controller('EditOrdersCtrl', [
    '$scope', '$state', '$rootScope', 'OrdersFactory', 'OrderDetailsFactory', '$global', '$options', 'CustomersFactory', 'SalemstFactory', 'fileUpload', 'UrlHelper', 'ngDialog','$cordovaCamera',
    function ($scope, $state, $rootScope, OrdersFactory, OrderDetailsFactory, $global, $options, CustomersFactory, SalemstFactory, fileUpload, UrlHelper, ngDialog, $cordovaCamera) {

        // 可取代Orders為對應model名稱，例: Orders --> Order
        $("#loading").fadeIn("fast");

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.order = $global.selectedOrder;

        if ($scope.vm.order.RECEIPT_PHOTO != null) {
            var url = UrlHelper.prepareUrl($scope.vm.order.RECEIPT_PHOTO);
            $scope.vm.order.RECEIPT_PHOTO = url;
        };
        

        SalemstFactory.getByEMPID($scope.vm.order.SALE_ID).success(function (data) {
            $scope.vm.order.SALE_NAME = data.EMP_NAME;
        }).error(function (err) {
            console.log(err);
        });

        CustomersFactory.getById($scope.vm.order.CUST_ID).success(function (data) {
            $scope.vm.order.CUST_NAME = data.CUST_NAME;
        }).error(function (err) {
            console.log(err);
        });

        OrderDetailsFactory.getOrderDetails($scope.vm.order).then(function (data) {

            $scope.vm.order.Details = data;

            angular.forEach($scope.vm.order.Details, function (item) {
                item.UNIT_PRICE = item.productDetail.SALE_PRICE;
                item.PROD_NAME = item.productDetail.PROD_NAME;
                item.OUNIT_ID = item.productDetail.OUNIT_ID;
                item.BASE_IDname = item.productDetail.BASE_IDname;
                item.PHOTO = item.productDetail.PHOTO;
                item.DLAST_QTYI = item.productDetail.DLAST_QTYI;
                item.PHOTO = UrlHelper.prepareUrl(item.PHOTO);
            });
            $("#loading").fadeOut("fast");
        });

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
            //上傳圖片
            var file = $scope.vm.order.RECEIPT_FILE;
            if (file != null) {
                var uploadUrl = UrlHelper.prepareUrl('api/files?owner=orders&folder=' + $scope.vm.order.VOU_SALE);
                fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {

                    // api傳回圖片路徑
                    $scope.vm.order.RECEIPT_PHOTO = data;

                    OrdersFactory.update($scope.vm.order).success(function (data) {
                        alert("儲存成功!!");
                        $state.go('m.Orders.list');
                    }).error(function (err) {
                        console.log(err);
                    });

                }).error(function () {
                    alert('儲存失敗');
                });
            }
            else {
                $scope.vm.order.RECEIPT_PHOTO = $scope.vm.order.RECEIPT_BASE64;

                OrdersFactory.update($scope.vm.order).success(function (data) {
                    alert("儲存成功!!");
                    $state.go('m.Orders.list');
                }).error(function (err) {
                    console.log(err);
                    alert('儲存失敗');
                });

            }
        };
        // 刪除
        $scope.vm.remove = function () {
            OrdersFactory.remove($scope.vm.order).success(function (data) {

                $state.go('m.Orders.list');
            }).error(function (err) {
                console.log(err);
            });
        };

        $scope.vm.returnToList = function () {
            $global.resetCart();
            $scope.$emit('updateCartCount', '');
            $state.go('m.Orders.list');
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = true;
        $scope.vm.order.RECEIPT_BASE64 = $scope.vm.order.RECEIPT_PHOTO;
        $scope.handleFileImg = function (evt) {
            evt = evt || window.event;
            readBase64(evt, $scope);
        };

        //狀態
        $scope.vm.order_status = {
            dataSource: {
                data: $options.STAT_MARK
            },
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "請選擇狀態"
        };

        // 顯示圖片
        function readBase64(evt, $scope) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    // $scope.vm.order.RECEIPT_BASE64 = evt.target.result;
                    $scope.vm.order.RECEIPT_PHOTO = evt.target.result;
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

        $scope.vm.takePhoto = function () {

            var options = {
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.CAMERA,
            };

            $cordovaCamera.getPicture(options).then(function(imageURI) {
              $scope.vm.order.RECEIPT_PHOTO = imageURI;
            }, function(err) {
              // error
            });
        }
        


    }]);

//只限輸入數字
function ValidateNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}