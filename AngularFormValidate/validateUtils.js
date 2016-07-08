(function () {
    angular.module('commonUtils')
        .service('validateUtils', ['alertService', 'utilsService', function (alertService, utilsService) {
            var service, strategies;

            strategies = {
                isNotEmpty: function (text) {
                    return !!utilsService.trim(text);
                },

                isMobile: function (mobile) {
                    return utilsService.isMobile(mobile);
                },

                isEmail: function (email) {
                    return utilsService.isEmail(email);
                },

                isQQ: function (qq) {
                    return utilsService.isQQ(qq);
                },

                minLength: function (text, length) {
                    var trimText = utilsService.trim(text);
                    return trimText && trimText.length >= length;
                },

                maxLength: function (text, length) {
                    var trimText = utilsService.trim(text);
                    return trimText && trimText.length <= length;
                }
            };

            service = {
                validate: validate
            };

            function validate(params) {
                for (var i = 0, len = params.length; i < len; ++i) {
                    // 出现错误，则停止后续校验
                    if (!startValidate(params[i])) {
                        return false;
                    }
                }

                return true;
            }

            function startValidate(data) {
                var value = data.value,
                    validators = data.validators.split('|'),
                    validatorArr, validatorName;

                for (var i = 0, len = validators.length; i < len; i++) {
                    validatorArr = validators[i].split(':');
                    validatorName = validatorArr.shift();

                    if (!strategies[validatorName]) {
                        continue;
                    }

                    validatorArr.unshift(value);

                    if (!strategies[validatorName].apply(null, validatorArr)) {
                        alertService.showWarn(data.msg);
                        return false;
                    }
                }

                return true;
            }

            return service;
        }]);
})();