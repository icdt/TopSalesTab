
angular.module('app', []).controller('OrdersReportsCtrl', [
    '$scope', '$state', '$stateParams', '$rootScope', '$timeout', 'ReportsFactory', '$datetime', 'ProductsFactory', 'UrlHelper','ngToast',
    function ($scope, $state, $stateParams, $rootScope, $timeout, ReportsFactory, $datetime, ProductsFactory, UrlHelper, ngToast) {

        // 可取代icdtdata為對應model名稱，例: icdtdata --> Order

        // 宣告vm
        $scope.vm = {};
        $scope.select = {};

        $scope.vm.report = {};
        $scope.vm.report.DATA = [];
        $scope.vm.report.allData = [];
        $scope.infiniteScroll = {};

        // 根據時間撈取資料
        $scope.vm.fetchData = function () {
            $scope.vm.report.DATA = null;
            $scope.infiniteScroll.NoMoreData = false;
            $("#loading").fadeIn("fast");
            ReportsFactory.getProductMonthlyReport($scope.vm.report.YEAR, $scope.vm.report.MONTH).success(function (data) {
                $("#loading").fadeOut("fast");

                if (data.length == 0) {
                    $scope.vm.report.DATA = 0
                    alert("查無資料");
                    return;
                } else {
                    $scope.vm.report.allData = data;
                }

                var toastStr = '載入資料' + data.length + '筆成功，產生表格中..(約數秒)';
                ngToast.create({
                    className: 'my_alert my_alert_danger',
                    content: toastStr
                });
                $timeout(function () {
                    $scope.vm.report.DATA = $scope.vm.report.allData.slice(0, 100);
                }, 1000);
            }).error(function (err) {
                console.log(err);
            });
        };

        $scope.select.yearAllOptions = {
            dataSource: {
                data: [{ text: '2014', value: '2014' },
                        { text: '2015', value: '2015' }
                ]
            },
            dataTextField: "text",
            dataValueField: "value",
            //optionLabel: "請選擇年份"
        };

        $scope.select.monthAllOptions = {
            //optionLabel: "請選擇月份",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                data: [{ text: '1', value: '1' },
                        { text: '2', value: '2' },
                        { text: '3', value: '3' },
                        { text: '4', value: '4' },
                        { text: '5', value: '5' },
                        { text: '6', value: '6' },
                        { text: '7', value: '7' },
                        { text: '8', value: '8' },
                        { text: '9', value: '9' },
                        { text: '10', value: '10' },
                        { text: '11', value: '11' },
                        { text: '12', value: '12' }
                ]
            }
        };
        $scope.infiniteScroll.NoMoreData = false;
        $scope.infiniteScroll.loadMore = function () {
            if ($scope.vm.report.allData.length == 0) return;

            var lastIndex = $scope.vm.report.DATA.length + 100;

            // 判對是否已捲到最底下
            if (lastIndex > $scope.vm.report.allData.length) {
                
                // 已顯示所有資料
                $scope.vm.report.DATA = $scope.vm.report.allData;
                if ($scope.infiniteScroll.NoMoreData == false) {
                    ngToast.create({
                        className: 'my_alert my_alert_danger',
                        content: "已顯示所有資料"
                    });
                    $scope.infiniteScroll.NoMoreData = true;
                }
                return;
            }

            //還未顯示所有資料
            if ($scope.infiniteScroll.NoMoreData == false) {
                $scope.vm.report.DATA = $scope.vm.report.allData.slice(0, lastIndex);
                return;
            }   

        };
        //var url = UrlHelper.prepareUrl('api/Stocks/bigCate');
        //$scope.select.productAllOptions = {
        //    dataSource: {
        //        transport: {
        //            read: {
        //                dataType: "json",
        //                url: url,
        //            }
        //        }
        //    },
        //    dataTextField: "Name",
        //    dataValueField: "Id",
        //    optionLabel: "請選擇商品類別"
        //};

        // 開新視窗列印 的 按扭動作
        $scope.vm.printTable = function () {
            $scope.vm.report.DATA = $scope.vm.report.allData;
            printData();
        };


        // 開新視窗列印
        function printData() {
            var divToPrint = document.getElementById('printTable1');
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

    }]);