
angular.module('app', []).controller('CreateProductsCtrl', [
    '$scope', '$state', '$stateParams', '$rootScope', 'ProductsFactory', '$global', 'fileUpload', 'UrlHelper',
    function ($scope, $state, $stateParams, $rootScope, ProductsFactory, $global, fileUpload, UrlHelper) {

        // 宣告vm
        $scope.vm = {};

        // 宣告變數, function, object
        $scope.vm.theProduct = {};

        //管理者介面
        $scope.handleFileImg = function (evt) {
            evt = evt || window.event;
            readBase64(evt, $scope);
        };

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
                    var uploadUrl = UrlHelper.prepareUrl('/api/files?owner=stock&folder=' + $global.selectedProduct.cate);
                    fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {

                        // api傳回圖片路徑
                        $scope.vm.theProduct.PHOTO = data;

                        //產品分類
                        $scope.vm.theProduct.FSECT_ID = $global.selectedProduct.fsect_id;
                        $scope.vm.theProduct.SUB_ID = $global.selectedProduct.cate;
                        $scope.vm.theProduct.tSUB_ID = $global.selectedProduct.cate;
                        //產品名稱
                        $scope.vm.theProduct.SUB_NAME = $scope.vm.theProduct.PROD_NAME;
                        // 內容介紹
                        $scope.vm.theProduct.INTRO = editor.getData();

                        ProductsFactory.create($scope.vm.theProduct).success(function (data) {
                            alert("新增成功!!");
                            $state.go('m.Products.mlist', { cate: $scope.vm.theProduct.SUB_ID });
                        }).error(function (err) {
                            console.log(err);
                        });



                    }).error(function () {
                        alert('上傳錯誤');
                    });
                }
                else {
                    //產品分類
                    $scope.vm.theProduct.FSECT_ID = $global.selectedProduct.fsect_id;
                    $scope.vm.theProduct.SUB_ID = $global.selectedProduct.cate;
                    $scope.vm.theProduct.tSUB_ID = $global.selectedProduct.cate;
                    //產品名稱
                    $scope.vm.theProduct.SUB_NAME = $scope.vm.theProduct.PROD_NAME;
                    // 內容介紹
                    $scope.vm.theProduct.INTRO = editor.getData();

                    ProductsFactory.create($scope.vm.theProduct).success(function (data) {
                        alert("新增成功!!");
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