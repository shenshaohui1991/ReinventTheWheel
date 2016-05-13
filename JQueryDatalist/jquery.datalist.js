/**
 * Created by shenshaohui on 2016/5/13.
 */
(function ($) {
    $.fn.datalist = function () {
        var inputs = $(this);

        inputs.each(function () {
            var $inputSelf = $(this),
                selectId = $inputSelf.data('select') || '',
                $select = $('#' + selectId),
                suggestId = selectId + '_' + parseInt(Math.random() * 10000),
                $suggests = $('<ul id="' + suggestId + '"  style="display: none;"></ul>'),
                createSuggest,
                hiddenSuggest,
                width = $inputSelf.width() - 2,
                height = $inputSelf.outerHeight(),
                hoverOnSuggest = false;

            $suggests.css({
                'top': height + 'px',
                'width': width + 'px'
            });

            createSuggest = function (text) {
                var $optionsCtrl = $('#' + selectId + ' option'),
                    result = [];

                text = text || '';

                for (var i = 0, len = $optionsCtrl.length; i < len; i++) {
                    if ($($optionsCtrl[i]).text().indexOf(text) > -1) {
                        result.push({
                            text: $($optionsCtrl[i]).text(),
                            value: $($optionsCtrl[i]).val()
                        });
                    }
                }

                $('#' + suggestId).empty();
                $suggests.css('display', 'none');

                result.forEach(function (li) {
                    $suggests.append($('<li data-value="' + li.value + '" data-text="' + li.text + '" >' + li.text + '</li>'));
                });

                $suggests.css('display', 'block');
            };

            hiddenSuggest = function () {
                $suggests.css('display', 'none');
            };

            // hidden
            $select.before($suggests);
            $select.css('display', 'none');

            // bind event
            $inputSelf.on('input keyup paste cut', function () {
                var text = $(this).val();
                createSuggest(text, $select);
            });

            $inputSelf.on('click dbclick', function () {
                createSuggest($(this).val());
            });

            $inputSelf.on('blur', function () {
                if (!hoverOnSuggest) {
                    hiddenSuggest();
                }
            });

            $suggests.on('mouseenter', function () {
                hoverOnSuggest = true;
            });

            $suggests.on('mouseleave', function () {
                hoverOnSuggest = false;
            });

            $('#' + suggestId).on('click', function (e) {
                var event = e || window.event,
                    target = event.target ? event.target : event.srcElement;

                if (target.tagName.toUpperCase() === 'LI') {
                    $inputSelf.val($(target).data('text'));
                    $('#' + selectId + ' option:selected').removeAttr('selected');
                    $select.find("option[value='" + $(target).data('value') + "']").attr("selected",true);
                }

                $suggests.css('display', 'none');
                hoverOnSuggest = false;
            });

        });
    };
})(jQuery);