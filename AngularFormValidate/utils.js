(function () {
    angular.module('commonUtils')
        .service('utilsService', [function () {
            var utilsService = {
                isNumberStr: isNumberStr,
                isEmail: isEmail,
                isQQ: isQQ,
                isMobile: isMobile,
                isBankNo: isBankNo,
                isDateStr: isDateStr,
                isDatetimeStr: isDatetimeStr,
                isBookTags: isBookTags,
                isIdentify: isIdentify
            };

            return utilsService;

            function isNumberStr(str) {
                return /^[1-9][0-9]*$/.test(str);
            }

            function isEmail(str) {
                //  /^[a-zA-Z0-9][a-zA-Z0-9_]+@[a-zA-Z0-9]{1,}(\.com|\.cn)$/ 忽略了`-`的情况
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
            }

            function isQQ(str) {
                return /^[1-9][0-9]{4,14}$/.test(str);
            }

            function isMobile(str) {
                return /^(13|14|15|17|18)[0-9]{9}$/.test(str);
            }

            function isBankNo(str) {
                // 各种银行卡都不同，暂时至判断长度
                return /^[1-9][0-9]{13,19}$/.test(str);
            }

            function isDateStr(str) {
                return /^[12][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(str);
            }

            function isDatetimeStr(str) {
                return /^[12][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(str);
            }

            function isBookTags(str) {
                // 中文 + 字母 + 数字  (\u3001)顿号
                return /^([\u4E00-\u9FA5a-zA-Z0-9]+[\u3001])*[\u4E00-\u9FA5a-zA-Z0-9]+$/.test(str);
            }

            function isIdentify(str) {
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
            }
        }]);
})();