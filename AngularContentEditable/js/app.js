/**
 * Created by shenshaohui on 2016/6/28.
 * @see https://code.angularjs.org/1.2.25/docs/api/ng/type/ngModel.NgModelController
 */
(function () {
    angular.module('myApp', [])
        .controller('myCtrl', ['$scope', function ($scope) {
            $scope.data = {
                htmlContent: '巴拉巴拉<span style="color: red;">hello world</span>巴拉巴拉',
                words: 0
            };
        }])
        .directive('contenteditable', ['$window', '$document', function ($window, $document) {
            return {
                restrict: 'A',
                require: '?ngModel',
                scope: {
                    words: '=' // 记录字数
                },
                link: function (scope, element, attrs, ngModel) {
                    if (!ngModel) {
                        throw new Error('load ngModel fail');
                    }

                    // model =>  view
                    ngModel.$render = function () {
                        var content = ngModel.$viewValue;

                        if (content) {
                            element.html(ngModel.$viewValue);
                            element.removeClass('hasPlaceholder')
                        } else {
                            element.html(attrs.placeholder);
                            element.addClass('hasPlaceholder');
                        }

                        calcWords();
                    };

                    // 处理placeholder
                    element.on('focus', function () {
                        // reset editor
                        if (element.text() === attrs.placeholder) {
                            element.html('');
                            element.removeClass('hasPlaceholder')
                            updateViewValue();
                        }
                    });

                    // view  =>  model
                    element.on('blur', function () {
                        if (element.text() === '' || element.text() === '\n') {
                            element.html(attrs.placeholder);
                            element.addClass('hasPlaceholder')
                        }
                        updateViewValue();
                    });

                    // 处理粘贴事件
                    element.on('paste', function (event) {
                        event.preventDefault();

                        var data = window.clipboardData || event.originalEvent.clipboardData,
                            text = data.getData('text/plain');

                        document.execCommand("insertText", false, text); // 自带格式

                        updateViewValue();
                    });

                    // 处理回车事件
                    element.on('keyup', function (e) {
                        if (e.which == 13) {
                            e.preventDefault();
                        }

                        updateViewValue();
                    });

                    // TODO: 处理剪切事件
                    element.on('keydown cut change input', function (e) {
                        if (e.which != 13) {
                            updateViewValue();
                        }
                    });

                    calcWords();

                    function calcWords() {
                        if (attrs.words && element && element[0] && !element.hasClass('hasPlaceholder')) {
                            var result = element[0].innerText.match(/\S/g);
                            scope.words = result ? result.length : 0;
                        } else if (attrs.words && element.hasClass('hasPlaceholder')) {
                            scope.words = 0;
                        }
                    }

                    function updateViewValue() {
                        var html = element.html();

                        html = html.replace(/<div>/, '\n'); // 替换第一个div解决，从WORD复制进来的文字的换行问题
                        html = html.replace(/<div>/g, '');
                        html = html.replace(/<\/div>/g, '\n');
                        html = html.replace(/<br>/g, '\n');

                        scope.$apply(function () {
                            ngModel.$setViewValue(html);
                            calcWords();
                        });
                    }
                }
            };
        }]);
})();
