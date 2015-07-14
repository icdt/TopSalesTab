app.factory('$datetime', ['$q', function ($q) {

    //今天日期
    var _newDate = function () {
        var date = new Date();
        return date;
    }

    //增加指定天數
    var _addDate = function (days) {
        var date = addDays(new Date(), days);
        return date;
    }

    //定義增加天數
    function addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    // 產生 yyyy[conStr]mm[conStr]dd 字串
    var _formatDate = function getFormattedDate(date, conStr) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + conStr + month + conStr + day;
    }

    // 產生 HH[conStr]MM[conStr]SS 字串
    var _formatTime = function getFormattedDate(datetime, conStr) {
        var hour = datetime.getHours().toString();
        hour = hour.length > 1 ? hour : '0' + hour;
        var min = datetime.getMinutes().toString();
        min = min.length > 1 ? min : '0' + min;
        var second = datetime.getSeconds().toString();
        second = second.length > 1 ? second : '0' + second;
        return hour + conStr + min + conStr + second;
    }
    // 產生 HH[conStr]MM 字串
    var _formatTime2 = function getFormattedDate(datetime, conStr) {
        var hour = datetime.getHours().toString();
        hour = hour.length > 1 ? hour : '0' + hour;
        var min = datetime.getMinutes().toString();
        min = min.length > 1 ? min : '0' + min;
        return hour + conStr + min;
    }

    var _createSearchStart = function (date) {
        var aa = _formatDate(date, "-") + " 00:00:00";
        return aa;
    };

    var _createSearchEnd = function (date) {
        var aa = _formatDate(date, "-") + " 23:59:59";
        return aa;
    };

    var _createSearchStart2 = function (date) {
        var aa = _formatDate(date, "-");
        return aa;
    };

    var _createSearchEnd2 = function (date) {
        var aa = _formatDate(date, "-");
        return aa;
    };



    return {
        newDate: _newDate,
        addDate: _addDate,
        formatDate: _formatDate,
        formatTime: _formatTime,
        formatTime2: _formatTime2,
        startTime: _createSearchStart,
        endTime: _createSearchEnd,
        startTime2: _createSearchStart2,
        endTime2: _createSearchEnd2
    };
}]);