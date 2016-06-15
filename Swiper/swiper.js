/**
 * Created by shenshaohui on 2016/6/14.
 */
(function ($) {
    $.fn.swiper = function () {
        /**
         * 1. 通过
         * */
        var $container = $(this), // 获得容器
            children = $container.children('.swiper-item'), // 滚动图片
            itemCount = children.length, // 实际元素数
            curIndex = 0, nextIndex = 1, preIndex = itemCount - 1, willShowIndex = 2, // 待展示元素
            defaultOptions = {
                speed: 3000,
                animateSpeed: 300
            },
            intervalId, runSwiperItem, setAnimate, setCss;

        if (itemCount == 0) {
            // no children
            throw new Error('no swiper-item, please check it');
        }

        for (var i = 0, len = itemCount; i < len; i++) {
            $(children[i]).attr('data-swiper-index', i);
        }

        setAnimate = function ($dom, type) {
            switch (type) {
                case 'bePre':
                    $dom.animate({
                        left: 0,
                        marginLeft: 0,
                        height: '95%',
                        opacity: 1
                    }, defaultOptions.animatedSpeed, function () {
                        $dom.removeClass('swiper-curItem')
                            .addClass('swiper-preItem')
                            .css({
                                zIndex: 10
                            });
                    });
                    break;
                case 'beCur':
                    $dom.css({
                        zIndex: 30
                    }).animate({
                        left: '50%',
                        marginLeft: -250,
                        height: '100%',
                        opacity: 1
                    }, defaultOptions.animatedSpeed, function () {
                        $dom.removeClass('swiper-nextItem')
                            .addClass('swiper-curItem');
                    });
                    break;
                case 'beNext':
                    $dom.animate({
                        right: 0,
                        marginLeft: 0,
                        height: '95%',
                        opacity: 1
                    }, defaultOptions.animatedSpeed, function () {
                        $dom.addClass('swiper-nextItem')
                            .css({
                                zIndex: 10
                            });
                    });
                    break;
                case 'fade':
                    $dom.animate({
                        left: '50%',
                        marginLeft: -250,
                        height: '100%',
                        opacity: 0
                    }, defaultOptions.animatedSpeed, function () {
                        $dom.removeClass('swiper-preItem')
                            .css({
                                zIndex: 1
                            });
                    });
                    break;
                default:
                    break;
            }
        };

        setCss = function ($dom, type) {
            switch (type) {
                case 'pre':
                    $dom.css({
                        left: 0,
                        marginLeft: 0,
                        height: '95%',
                        opacity: 1,
                        zIndex: 10
                    });
                    break;
                case 'cur':
                    $dom.css({
                        left: '50%',
                        marginLeft: -250,
                        height: '100%',
                        opacity: 1,
                        zIndex: 30
                    });
                    break;
                case 'next':
                    $dom.css({
                        right: 0,
                        marginLeft: 0,
                        height: '95%',
                        opacity: 1,
                        zindex: 10
                    });
                    break;
                default:
                    break;
            }
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
        };

        // 定时器
        intervalId = setInterval(runSwiperItem, defaultOptions.speed);
    };
})(jQuery);