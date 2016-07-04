/**
 * Created by shenshaohui on 2016/6/14.
 */
(function ($) {
    $.fn.swiper = function () {
        var $container = $(this), // 获得容器
            children = $container.children('.swiper-item'), // 滚动图片
            itemCount = children.length, // 实际元素数
            curIndex = 0,
            nextIndex = 1,
            preIndex = itemCount - 1,
            willShowIndex = 2, // 待展示元素
            defaultOptions = {
                speed: 3000,
                animateSpeed: 300
            },
            bePreAnimate = {
                left: '-30%',
                height: '80%',
                opacity: 1
            },
            beNextAnimate = {
                left: '30%',
                height: '80%',
                opacity: 1
            },
            beCurAnimate = {
                left: '0',
                right: 0,
                height: '100%',
                opacity: 1
            },
            beFadeAnimate = {
                left: '0',
                right: 0,
                height: '100%',
                opacity: 0
            },
            beNextCss = {
                left: '30%',
                height: '80%',
                opacity: 1
            },
            beCurCss = {
                left: 0,
                height: '100%',
                opacity: 1
            },
            bePreCss = {
                left: '-30%',
                height: '80%',
                opacity: 1
            },
            $dots = $('<ul class="swiper-dots"></ul>'),
            $dot, intervalId, runSwiperItem, setAnimate, setCss, setActiveDot;

        if (itemCount == 0) {
            // no children
            throw new Error('no swiper-item, please check it');
        }

        for (var i = 0, len = itemCount; i < len; i++) {
            $(children[i]).attr('data-swiper-index', i);
            if (i == 0) {
                $dots.append($('<li class="active" data-index="' + i + '"></li>'));
            } else {
                $dots.append($('<li data-index="' + i + '"></li>'));
            }
        }
        $container.append($dots);
        $dot = $dots.children('li');

        setAnimate = function ($dom, type) {
            switch (type) {
                case 'bePre':
                    $dom.animate(bePreAnimate, defaultOptions.animateSpeed, function () {
                        $dom.removeClass('swiper-curItem')
                            .addClass('swiper-preItem');
                    });
                    break;
                case 'beCur':
                    $dom.animate(beCurAnimate, defaultOptions.animateSpeed, function () {
                        $dom.removeClass('swiper-nextItem')
                            .addClass('swiper-curItem');
                    });
                    break;
                case 'beNext':
                    $dom.animate(beNextAnimate, defaultOptions.animateSpeed, function () {
                        $dom.addClass('swiper-nextItem');
                    });
                    break;
                case 'fade':
                    $dom.animate(beFadeAnimate, defaultOptions.animateSpeed, function () {
                        $dom.removeClass('swiper-preItem');
                    });
                    break;
                default:
                    break;
            }
        };

        setCss = function ($dom, type) {
            switch (type) {
                case 'pre':
                    $dom.css(bePreCss);
                    break;
                case 'cur':
                    $dom.css(beCurCss);
                    break;
                case 'next':
                    $dom.css(beNextCss);
                    break;
                default:
                    break;
            }
        };

        setActiveDot = function (index) {
            $dot.removeClass('active');
            $dot.filter('[data-index="' + index + '"]').addClass('active');
        };

        // 初始化位置类
        setCss($($container.children()[preIndex]).addClass('swiper-preItem'), 'pre');
        setCss($($container.children()[curIndex]).addClass('swiper-curItem'), 'cur');
        setCss($($container.children()[nextIndex]).addClass('swiper-nextItem'), 'next');

        // 动画函数
        runSwiperItem = function () {
            setAnimate($('.swiper-item[data-swiper-index=' + preIndex + ']'), 'fade');
            setAnimate($('.swiper-item[data-swiper-index=' + curIndex + ']'), 'bePre');
            setAnimate($('.swiper-item[data-swiper-index=' + nextIndex + ']'), 'beCur');
            setAnimate($('.swiper-item[data-swiper-index=' + willShowIndex + ']'), 'beNext');

            preIndex = curIndex;
            nextIndex = (curIndex + 2) % itemCount;
            willShowIndex = (curIndex + 3) % itemCount;
            curIndex = (curIndex + 1) % itemCount;

            setActiveDot(curIndex);
        };

        // 定时器
        intervalId = setInterval(runSwiperItem, defaultOptions.speed);
    };
})(jQuery);