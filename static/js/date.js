(function (w) {

    var monthCountArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function isLeapYear(iYear) {    //是否是闰年
        if (iYear % 4 == 0 && iYear % 100 != 0) {
            return true;
        } else {
            if (iYear % 400 == 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 获取一共多少周
     * @param y
     * @param m
     * @returns {number}
     */
    function getWeeks(y, m) {
        var fd = new Date(y, m - 1, 1);
        var fday = fd.getDay();
        var fwd = 7 - fday;
        var weeks = 1;
        fd.setDate(fwd);
        while (fd <= new Date(y, m, 1)) {
            fd.setDate(fd.getDate() + 7);
            if (fd.getMonth() != m || (fd.getMonth() == m && fd.getDate() < 7))weeks++;
        }
        return weeks;
    }

    /**
     * 解析Html
     * @param year
     * @param month
     * @param galas 节日，格式如：[{month: 3, date: 12, gala: '植树节'}, {month: 9, date: 10, gala: '教师节'}]
     */
    var parseHtml = function (year, month, galas) {

        if (isLeapYear(year))   // 如果是闰年，则为29天
            monthCountArray[1] = 29;
        var date = 1;

        var firstDate = new Date(year, month, 1);
        $('div.mui-content').append(
            '<div class="date-header mui-text-center">'
            + moment(firstDate).format('YYYY年M月')
            + '</div>'
        );
        var html = '<div class="date-body">';

        var parseRow = function (day) {
            var big = monthCountArray[month];
            if (day <= 7) {
                html += '<div class="flex-form">';
                for (var i = day; i >= 1; i--) {
                    html += '<div class="flex-form-item mui-text-center date" disabled="true"></div>';
                }
            }

            for (var i = 1; i <= 7 - day; i++) {
                if (date <= big) {

                    var obj = _.find(galas, {month: month + 1, date: date});
                    var gala = obj ? obj.gala : '';
                    var current = new Date(year, month, date);
                    var disabled = new Date().getTime() > current.getTime() ? true : false;

                    html +=
                        '<div class="flex-form-item mui-text-center date " ' +
                        'data-year="' + year + '" ' +
                        'data-month="' + (month + 1) + '"' +
                        'data-date="' + date + '"' +
                        'data-gala="' + gala + '"' +
                        'disabled="' + disabled + '"' +
                        '>'
                        + date
                        + '<span class="date-tip">' + gala + '</span>'
                        + '</div>';

                    date++;
                }

            }

            if (date > big) {
                var day = new Date(year, month, big).getDay();
                for (var i = 0; i < 7 - day - 1; i++) {
                    html += '<div class="flex-form-item mui-text-center date" disabled="true">' + '' + '</div>';
                }
            }
            html += '</div>';
        };

        for (var i = 1; i <= getWeeks(year, month + 1); i++) {
            var day = new Date(year, month, date).getDay();
            parseRow(day);
        }
        html += '</div>';

        $('div.mui-content').append(html);
    };

    w.parseHtml = parseHtml;
})(window);