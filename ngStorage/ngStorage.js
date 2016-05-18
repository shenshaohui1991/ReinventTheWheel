/**
 * Created by shenshaohui on 2016/5/16.
 */
(function (factory) {
    'use strict';
    if (typeof exports === 'object') {
        module.exports = factory(angular);
    } else if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else {
        factory(angular);
    }
}(function (angular) {
    var _provider = function (type) {
        return function () {
            var prefix = 'ngStorage';

            this.setPrefix = function (pre) {
                prefix = pre;
            };

            this.$get = function () {
                return {
                    setItem: function (key, value) {
                        try {
                            // 避免在iphone && ipad上偶尔报错，先删除再设置
                            if (this.getItem(key) !== null) {
                                this.removeItem(key);
                            }
                            window[type].setItem(key, value);
                        } catch (oException) {
                            // 超过大小限制，清空缓存
                            if (oException.name == 'QuotaExceededError') {
                                window[type].clear();
                                window[type].setItem(key, value);
                            }
                        }
                    },

                    getItem: function (key) {
                        // 统一返回值，避免JSON.parse报错
                        var result = window[type].getItem(prefix + '-' + key);
                        return result ? result : null;
                    },

                    removeItem: function (key) {
                        window[type].removeItem(prefix + '-' + key);
                    }
                };
            };
        };
    };

    return angular.module('ngStorage', [])
        .provider('ngLocalStorage', [_provider('localStorage')])
        .provider('ngSessionStorage', [_provider('sessionStorage')]);
}));
