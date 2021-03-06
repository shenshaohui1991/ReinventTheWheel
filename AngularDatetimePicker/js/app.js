/**
 * Created by shenshaohui on 15/8/13.
 */
(function () {
    angular.module('myApp', [])
        .controller('myCtrl', ['$scope', function ($scope) {
            $scope.time = "";
        }])
        .directive('datetimepicker', function () {
            return {
                restrict: 'EA',
                templateUrl: './html/datetimepicker.html',
                replace: true,
                transclude: false,
                scope: {
                    // 指定 指令内部的属性 和外部的关系 (左为内部 右为外部  内外相同时，可省略外部属性名)
                    // = 双向绑定
                    // & 函数
                    // @ 单向绑定
                    datetime: '=',
                    needtime: '@'
                },
                link: function (scope, element, attrs) {
                    var format = scope.needtime ? 'Y-m-d H:i' : 'Y-m-d';

                    $(".datetime").datetimepicker({
                        format: format,
                        timepicker: !!scope.needtime,
                        lang: 'zh',
                        yearStart: 2014
                    });
                }
            };
        });
})();
