angular.module('app', []).controller('SalesReportsCtrl', [
    '$scope', '$state', '$stateParams', '$rootScope', 'ReportsFactory', '$datetime',
    function ($scope, $state, $stateParams, $rootScope, ReportsFactory, $datetime) {

        // 可取代icdtdata為對應model名稱，例: icdtdata --> Order

        // 宣告vm
        $scope.vm = {};
        $scope.vm.reportOption = $stateParams.option;

        $scope.vm.report = {};
        $scope.vm.report.START = $datetime.newDate(-2);
        $scope.vm.report.END = $datetime.newDate();


        // 動作
        // 根據時間撈取資料
        $scope.vm.fetchData = function () {

            var objstart = $datetime.formatDate($scope.vm.report.START) + " 00:00:00";
            var objend = $datetime.formatDate($scope.vm.report.END) + " 23:59:59";

            ReportsFactory.getSalesOrderReport(objstart, objend).then(function (data) {
                $scope.vm.report.DATA = data;
            });

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
                'table th, table td {' +
                'border:1px solid #ddd;' +
                '}' +
                '</style>';
            htmlToPrint += divToPrint.outerHTML;
            newWin = window.open("");
            newWin.document.write(htmlToPrint);
            newWin.print();
            newWin.close();
        }

    }]);