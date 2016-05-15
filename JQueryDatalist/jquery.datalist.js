/**
 * Created by shenshaohui on 2016/5/13.
 */
(function ($) {
    $.fn.datalist = function () {
        $(this).each(function () {
            var $inputSelf = $(this),
                selectId = $inputSelf.data('select') || '',
                suggestId = selectId + '_' + parseInt(Math.random() * 10000),
                $select = $('#' + selectId),
                $options = $('#' + selectId + ' option'),
                $suggests = $('<ul id="' + suggestId + '"></ul>'),
                createSuggest,
            // without border and padding, total 6px
                width = $inputSelf.outerWidth() - 6,
                height = $inputSelf.outerHeight();

            $suggests.css({
                'top': height + 'px',
                'width': width + 'px',
                'display': 'none'
            });

            if ($select.length == 0) {
                throw new Error('you need check the attribute data-select in input');
            } else {
                $select.before($suggests).css('display', 'none');
            }

            createSuggest = function (text) {
                var result = [],
                    matchStr = text || '';

                for (var i = 0, len = $options.length; i < len; i++) {
                    if ($($options[i]).text().indexOf(matchStr) > -1) {
                        result.push({
                            text: $($options[i]).text(),
                            value: $($options[i]).val()
                        });
                    }
                }

                $suggests.empty().css('display', 'none');

                result.forEach(function (li) {
                    $suggests.append($('<li data-value="' + li.value + '" data-text="' + li.text + '" >' + li.text + '</li>'));
                });

                $suggests.css('display', 'block');
            };

            $inputSelf.on('input keyup paste cut', function () {
                createSuggest($(this).val());
            });

            $inputSelf.on('click dbclick focus', function () {
                createSuggest($(this).val());
            });

            $inputSelf.on('blur', function () {
                $suggests.css('display', 'none');
            });

            $suggests.on('mousedown', function (e) {
                var event = e || window.event,
                    target = event.target ? event.target : event.srcElement;

                if (target.tagName.toUpperCase() === 'LI') {
                    $inputSelf.val($(target).data('text'));
                    $('#' + selectId + ' option:selected').removeAttr('selected');
                    $select.find("option[value='" + $(target).data('value') + "']").attr("selected", true);
                }

                $suggests.css('display', 'none');
            });

        });
    };
})(jQuery);