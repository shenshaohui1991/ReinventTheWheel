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
        .directive('contenteditable', [function () {
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


                    // TODO: 处理回车 && 复制粘贴
                    element.on('keydown', function (e) {
                        if (e.which == 13) {
                            //e.preventDefault();

                        }
                    });

                    element.on('keyup cut paste change', function () {
                        updateViewValue();
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
                        scope.$apply(function () {
                            ngModel.$setViewValue(element.html());
                            calcWords();
                        });
                    }
                }
            };
        }]);
})();
