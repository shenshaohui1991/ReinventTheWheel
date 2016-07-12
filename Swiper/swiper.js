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
            hasFadeIndex = itemCount - 2, // 已经消失的元素
            willShowIndex = 2, // 待展示元素
            defaultOptions = {
                speed: 3000,
                animateSpeed: 200
            },
            bePreAnimate, backPreAnimate, beNextAnimate, backNextAnimate,
            beCurAnimate, backCurAnimate, beFadeAnimate, backHideAnimate,
            beNextCss = {
                left: '30%',
                top: '10%',
                height: '80%',
                transform: 'rotateY(-10deg)',
                opacity: 1,
                zIndex: 10
            },
            beCurCss = {
                left: 0,
                top: 0,
                height: '100%',
                transform: 'rotateY(0)',
                opacity: 1,
                zIndex: 30
            },
            bePreCss = {
                left: '-30%',
                top: '10%',
                height: '80%',
                transform: 'rotateY(10deg)',
                opacity: 1,
                zIndex: 10
            },
            $dots = $('<ul class="swiper-dots"></ul>'),
            $dot, intervalId, swiperGoNext, swiperGoPrev, setAnimate, setCss, setActiveDot;

        bePreAnimate = backPreAnimate = {
            left: '-30%',
            top: '10%',
            height: '80%',
            opacity: 1,
            zIndex: 10
        };
        beNextAnimate = backNextAnimate = {
            left: '30%',
            top: '10%',
            height: '80%',
            opacity: 1,
            zIndex: 10
        };
        beCurAnimate = backCurAnimate = {
            left: 0,
            top: 0,
            right: 0,
            height: '100%',
            opacity: 1
        };
        beFadeAnimate = backHideAnimate = {
            left: 0,
            top: 0,
            right: 0,
            height: '100%',
            opacity: 0,
            zIndex: 1
        };

        if (itemCount == 0) {
            // no children
            throw new Error('no swiper-item, please check it');
        }

        for (var i = 0, len = itemCount; i < len; i++) {
            $(children[i]).attr('data-swiper-index', i);

            // 创建进度条
            if (i == 0) {
                $dots.append($('<li class="active" data-index="' + i + '"></li>'));
            } else {
                $dots.append($('<li data-index="' + i + '"></li>'));
            }
        }
        $container.append($dots);
        $dot = $dots.children('li');

        // 添加左右可点击按钮
        $container.append($('<div class="swiper-btn goPrev-btn"></div>'));
        $container.append($('<div class="swiper-btn goNext-btn"></div>'));

        $('.goPrev-btn').on('click', function () {
            clearInterval(intervalId);
            intervalId = setInterval(swiperGoNext, defaultOptions.speed);
            swiperGoPrev();
        });

        $('.goNext-btn').on('click', function () {
            clearInterval(intervalId);
            intervalId = setInterval(swiperGoNext, defaultOptions.speed);
            swiperGoNext();
        });

        // 添加进度条点击
        $dot.on('mouseenter', function () {
            var index = $(this).data('index'),
                diff = index - curIndex,
                positive = diff > 0,
                len, moveFn;

            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }

            if (diff == 0) {
                return;
            }

            if (Math.abs(diff) > Math.ceil(itemCount / 2)) {
                len = itemCount - Math.abs(diff);
                moveFn = positive ? swiperGoPrev : swiperGoNext;
            } else {
                len = Math.abs(diff);
                moveFn = positive ? swiperGoNext : swiperGoPrev;
            }

            for (var i = 0; i < len; i++) {
                moveFn();
            }

        });

        $dot.on('mouseleave', function () {
            if (!intervalId) {
                intervalId = setInterval(swiperGoNext, defaultOptions.speed);

                console.log('set interval', intervalId);
            }
        });

        setAnimate = function ($dom, type) {
            switch (type) {
                case 'bePre':
                    $dom
                        .css({
                            transform: 'rotateY(10deg)'
                        })
                        .animate(bePreAnimate, defaultOptions.animateSpeed)
                        .removeClass('swiper-curItem')
                        .addClass('swiper-preItem');
                    break;
                case 'beCur':
                    $dom
                        .css({
                            'z-index': 50,
                            transform: 'rotateY(0)'
                        })
                        .removeClass('swiper-nextItem')
                        .addClass('swiper-curItem')
                        .animate(beCurAnimate, defaultOptions.animateSpeed, function () {
                            $dom
                                .css({
                                    'z-index': 30
                                });
                        });
                    break;
                case 'beNext':
                    $dom
                        .css({
                            transform: 'rotateY(-10deg)'
                        })
                        .addClass('swiper-nextItem')
                        .animate(beNextAnimate, defaultOptions.animateSpeed);
                    break;
                case 'fade':
                    $dom
                        .removeClass('swiper-preItem')
                        .animate(beFadeAnimate, defaultOptions.animateSpeed, function () {
                            $dom
                                .css({
                                    transform: 'rotateY(0)'
                                });
                        });
                    break;
                case 'backPre':
                    $dom
                        .css({
                            transform: 'rotateY(10deg)'
                        })
                        .animate(backPreAnimate, defaultOptions.animateSpeed)
                        .addClass('swiper-preItem');
                    break;
                case 'backCur':
                    $dom
                        .css({
                            'z-index': 50,
                            transform: 'rotateY(0)'
                        })
                        .removeClass('swiper-preItem')
                        .animate(backCurAnimate, defaultOptions.animateSpeed, function () {
                            $dom
                                .css({'z-index': 30});
                        })
                        .addClass('swiper-curItem');
                    break;
                case 'backNext':
                    $dom
                        .css({
                            transform: 'rotateY(-10deg)'
                        })
                        .animate(backNextAnimate, defaultOptions.animateSpeed)
                        .removeClass('swiper-curItem')
                        .addClass('swiper-nextItem');
                    break;
                case 'backHide':
                    $dom
                        .css({
                            transform: 'rotateY(0)'
                        })
                        .animate(backHideAnimate, defaultOptions.animateSpeed)
                        .removeClass('swiper-nextItem');
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
        swiperGoNext = function () {
            setAnimate($('.swiper-item[data-swiper-index=' + preIndex + ']'), 'fade');
            setAnimate($('.swiper-item[data-swiper-index=' + curIndex + ']'), 'bePre');
            setAnimate($('.swiper-item[data-swiper-index=' + nextIndex + ']'), 'beCur');
            setAnimate($('.swiper-item[data-swiper-index=' + willShowIndex + ']'), 'beNext');

            hasFadeIndex = preIndex;
            preIndex = curIndex;
            nextIndex = (curIndex + 2) % itemCount;
            willShowIndex = (curIndex + 3) % itemCount;
            curIndex = (curIndex + 1) % itemCount;

            console.log('go next', hasFadeIndex, preIndex, curIndex, nextIndex, willShowIndex);

            setActiveDot(curIndex);
        };

        swiperGoPrev = function () {
            setAnimate($('.swiper-item[data-swiper-index=' + hasFadeIndex + ']'), 'backPre');
            setAnimate($('.swiper-item[data-swiper-index=' + preIndex + ']'), 'backCur');
            setAnimate($('.swiper-item[data-swiper-index=' + curIndex + ']'), 'backNext');
            setAnimate($('.swiper-item[data-swiper-index=' + nextIndex + ']'), 'backHide');

            curIndex = (preIndex) % itemCount;
            hasFadeIndex = curIndex - 2 < 0 ? curIndex - 2 + itemCount : curIndex - 2;
            preIndex = curIndex - 1 < 0 ? curIndex - 1 + itemCount : curIndex - 1;
            nextIndex = (curIndex + 1) % itemCount;
            willShowIndex = (curIndex + 2) % itemCount;

            console.log('go prev', hasFadeIndex, preIndex, curIndex, nextIndex, willShowIndex);

            setActiveDot(curIndex);
        };

        // 定时器
        intervalId = setInterval(swiperGoNext, defaultOptions.speed);
    };
})(jQuery);