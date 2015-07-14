app.controller('validationCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

    $scope.vm = {};

    //下拉選單
    //產品類別
    $scope.product_category = {
        dataSource: {
            data: [{ category: 0, name: '常用' },
                   { category: 1, name: '預備品' },
                   { category: 2, name: '熱門銷售' }]
        },
        dataTextField: "name",
        dataValueField: "category",
        optionLabel: "請選擇產品類別"
    };

    //數字篩選
    $("#price_change").kendoNumericTextBox(
        {
            culture: "de-DE",
            value: 0,
            step: 100
        });

    //日期篩選
    $("#Start_Date").kendoDatePicker({
        culture: "zh-CHT",
        format: "yyyy/MM/dd"
    });

    $("#End_Date").kendoDatePicker({
        culture: "zh-CHT",
        format: "yyyy/MM/dd"
    });

    //顯示時間
    $("#Show_Time").kendoTimePicker({
    });

    //自動完成
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            }
        }
    });
    $("#autocomplete").kendoAutoComplete({
        dataSource: dataSource,
        dataTextField: "ProductName"
    });

    //Tab切換容器
    $("#tabstrip").kendoTabStrip({
        animation: { open: { effects: "fadeIn" } },
        contentUrls: []
    });

    //單張圖片上傳
    $("#file").kendoUpload({
        multiple: false,
        async: {
            saveUrl: "save",
            removeUrl: "remove",
            autoUpload: false
        }
    });

    //多張圖片上傳
    $("#files").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "save",
            removeUrl: "remove",
            autoUpload: false
        }
    });

    //備註
    $("#note").kendoEditor({
        tools: [
                 "bold",
                 "italic",
                 "underline",
                 "strikethrough",
                 "justifyLeft",
                 "justifyCenter",
                 "justifyRight",
                 "justifyFull",
                 "foreColor",
                 "backColor"
        ]
    });

    //驗證區塊
    $scope.submitted = false;
    $scope.signupForm = function () {
        if ($scope.signup_form.$valid) {
            $scope.signup_form.submitted = false;
            alert("儲存成功!!");
        } else {
            $scope.signup_form.submitted = true;
        }
    }
}]);