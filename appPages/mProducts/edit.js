
angular.module('app', []).controller('EditProductsCtrl', [
    '$scope', '$state', '$stateParams', '$rootScope', 'ProductsFactory', '$global', '$sce', 'fileUpload', 'UrlHelper', 'OrderDetailsFactory', 'OrdersFactory', 'CustomersFactory', 'VouSaleFactory', 'ngDialog',
    function ($scope, $state, $stateParams, $rootScope, ProductsFactory, $global, $sce, fileUpload, UrlHelper, OrderDetailsFactory, OrdersFactory, CustomersFactory, VouSaleFactory, ngDialog) {

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.theProduct = {};
        $scope.vm.addProduct = {};
        $scope.vm.autocomplete = {};
        $scope.vm.autocompleteSelect = null;
        // 取得被選擇的產品
        $scope.vm.theProduct = $global.selectedProduct;
        //設定編輯器
        $scope.trustAsHtml = $sce.trustAsHtml;

        //管理者介面
        if ($state.current.name == "m.Products.edit") {
            //上傳圖片
            $scope.vm.theProduct.PHOTO_BASE64 = $scope.vm.theProduct.PHOTO;
            $scope.handleFileImg = function (evt) {
                evt = evt || window.event;
                readBase64(evt, $scope);
            };

            //內容介紹
            editor.setData($scope.vm.theProduct.INTRO);
        }
        else {
            $scope.vm.addToCart = function (data) {
                if (data.ORD_QTYI > 0) {
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
                        $state.go('m.Products.list', { cate: $scope.vm.theProduct.SUB_ID });
                    }
                } else {
                    alert("請輸入數量");
                }
            };

            $scope.vm.addToCustomerToCart = function (data) {
                if ($scope.vm.autocompleteSelect) {
                    var ppObj = {
                        CUST_ID: $scope.vm.autocompleteSelect.CUST_ID,
                        SALE_ID: $global.loginUser.EMP_ID
                    };

                    VouSaleFactory.getByEMPID(ppObj.SALE_ID).success(function (obj) {
                        ppObj.VOU_SALE = obj;
                        $global.newOrder = OrdersFactory.preparePostObj(ppObj);
                        $global.selectedCustomer = $scope.vm.autocompleteSelect;


                        var newItem = OrderDetailsFactory.preparePostObj($global.newOrder, data);

                        $global.addToCart(newItem);

                        // 更新購物車數量
                        $scope.$emit('updateCartCount', '');
                        $state.go('m.Products.list', { cate: $scope.vm.theProduct.SUB_ID });
                    }).error(function (err) {
                        console.log(err);
                    });

                    ngDialog.close();
                }
                else {
                    alert("請選擇客戶");
                }

            }

            //取得所有客戶項目
            CustomersFactory.getAll().success(function (customer) {
                //console.log(customer);
                //debugger;
                CustomersFactory.getAutoCompleteOptions(customer, "...").then(function (searchcustomer) {
                    //console.log(searchcustomer);
                    //debugger;
                    $scope.vm.autocomplete.allCustomersName = searchcustomer;
                });
            }).error(function (err) {
                console.log(err);
            });

            //輸入字串時動作
            $scope.vm.doSomething1 = function (typedthings) {
                CustomersFactory.getByName(typedthings).success(function (customer) {
                    CustomersFactory.getAutoCompleteOptions(customer, typedthings).then(function (searchcustomer) {
                        $scope.autocomplete.allCustomersName = searchcustomer;
                        $scope.autocomplete.isSearchCustomer = false;
                    });
                }).error();
            }

            //下拉選擇動作
            $scope.vm.doSomethingElse1 = function (suggestion) {
                CustomersFactory.getByName(suggestion).success(function (customer) {
                    $scope.vm.autocompleteSelect = _.find(customer, function (item) {
                        return item.CUST_NAME == suggestion;
                    });

                }).error();
            }
        }

        // 動作
        // 儲存
        $scope.vm.save = function () {
            //驗證區塊
            $scope.submitted = false;
            if ($scope.signup_form.$valid) {
                $scope.signup_form.submitted = false;

                //上傳圖片
                var file = $scope.vm.theProduct.PHOTO_FILE;
                if (file != null) {
                    var uploadUrl = UrlHelper.prepareUrl('/api/files?owner=stock&folder=' + $scope.vm.theProduct.SUB_ID);
                    fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {

                        // api傳回圖片路徑
                        $scope.vm.theProduct.PHOTO = data;

                        // 內容介紹
                        $scope.vm.theProduct.INTRO = editor.getData();

                        ProductsFactory.update($scope.vm.theProduct).success(function (data) {
                            alert("儲存成功!!");
                            $state.go('m.Products.mlist', { cate: $scope.vm.theProduct.SUB_ID });
                        }).error(function (err) {
                            console.log(err);
                        });



                    }).error(function () {
                        alert('上傳錯誤');
                    });
                }
                else {
                    $scope.vm.theProduct.PHOTO = $scope.vm.theProduct.PHOTO_BASE64;

                    // 內容介紹
                    $scope.vm.theProduct.INTRO = editor.getData();

                    ProductsFactory.update($scope.vm.theProduct).success(function (data) {
                        alert("儲存成功!!");
                        $state.go('m.Products.mlist', { cate: $scope.vm.theProduct.SUB_ID });
                    }).error(function (err) {
                        console.log(err);
                    });

                }

            } else {
                $scope.signup_form.submitted = true;
            }
        };
        // 刪除
        $scope.vm.remove = function () {
            ProductsFactory.remove($scope.vm.theProduct).success(function (data) {

                $state.go('m.Products.mlist');
            }).error(function (err) {
                console.log(err);
            });
        };

        // 使用者介面基本設定
        $scope.vm.isEdit = true;

    }]);

//只限輸入數字
function ValidateNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}

//檔案上傳
function readBase64(evt, $scope) {
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
            $scope.vm.theProduct.PHOTO_BASE64 = evt.target.result;
            //callbackobj.imageFix64 = evt.target.result.substr(evt.target.result.indexOf(',') + 1);
        });
    };
    reader.readAsDataURL(file);
}