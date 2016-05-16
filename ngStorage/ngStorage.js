/**
 * Created by shenshaohui on 2016/5/16.
 */
(function (factory) {
    'use strict';
    if (typeof exports === 'object') {
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else {
        factory(angular);
    }
}(function (angular) {
    return angular.module('ngStorage', [])
        .provider('ngStorageProvider', [function () {
            var isSupport = window.localStorage;

            this.$get = function () {
                return {
                    setItem: (function () {
                        if (isSupport) {
                            return function (key, value) {

                                window.localStorage.setItem(key, value);
                            };
                        } else {
                            return function (key, value) {

                            };
                        }
                    })(),

                    getItem: (function () {
                        if (isSupport) {
                            return function (key) {
                                return window.localStorage.getItem(key);
                            };
                        } else {
                            return function (key) {

                            };
                        }
                    })(),

                    removeItem: (function () {
                        if (isSupport) {
                            return function (key) {
                                window.localStorage.removeItem(key);
                            };
                        } else {
                            return function (key) {

                            };
                        }
                    })()
                };
            };
        }]);
}));
