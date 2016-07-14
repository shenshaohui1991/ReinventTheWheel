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
                speed: 4000,
                animateSpeed: 300
            },
            bePre, beNext, beCur, beFade,
            $dots = $('<ul class="swiper-dots"></ul>'),
            $dot, intervalId, swiperGoNext, swiperGoPrev, setAnimate, setCss, setActiveDot;

        bePre = {
            left: '-25%',
            top: '15%',
            width: '70%',
            height: '70%'
        };
        beNext = {
            left: '55%',
            top: '15%',
            width: '70%',
            height: '70%'
        };
        beCur = {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        };
        beFade = {
            left: 0,
            width: '70%',
            height: '70%'
        };

        if (itemCount == 0) {
            // no children
            throw new Error('no swiper-item, please check it');
        }

        for (var i = 0, len = itemCount; i < len; i++) {
            // 添加序号
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
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            intervalId = setInterval(swiperGoNext, defaultOptions.speed);
            swiperGoPrev();
        });

        $('.goNext-btn').on('click', function () {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            intervalId = setInterval(swiperGoNext, defaultOptions.speed);
            swiperGoNext();
        });

        // 添加进度条点击
        $dot.on('mouseover', function () {
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

        $dot.on('mouseout', function () {
            if (!intervalId) {
                intervalId = setInterval(swiperGoNext, defaultOptions.speed);
                console.log('new interval:', intervalId);
            }
        });

        setAnimate = function ($dom, type, animateSpeed) {
            animateSpeed = animateSpeed || defaultOptions.animateSpeed;

            switch (type) {
                case 'bePre':
                    $dom
                        .stop(false, false, true)
                        .css({
                            opacity: 1
                        })
                        .removeClass('swiper-curItem')
                        .addClass('swiper-preItem')
                        .animate(bePre, animateSpeed);
                    break;
                case 'backPre':
                    $dom
                        .stop(false, false, true)
                        .css({
                            opacity: 1
                        })
                        .addClass('swiper-preItem')
                        .animate(bePre, animateSpeed);
                    break;
                case 'beCur':
                    $dom
                        .stop(false, false, true)
                        .css({
                            opacity: 1
                        })
                        .removeClass('swiper-nextItem')
                        .addClass('swiper-curItem')
                        .animate(beCur, animateSpeed);
                    break;
                case 'backCur':
                    $dom
                        .stop(false, false, true)
                        .css({
                            opacity: 1
                        })
                        .removeClass('swiper-preItem')
                        .addClass('swiper-curItem')
                        .animate(beCur, animateSpeed);
                    break;
                case 'beNext':
                    $dom
                        .stop(false, false, true)
                        .css({
                            opacity: 1
                        })
                        .addClass('swiper-nextItem')
                        .animate(beNext, animateSpeed);
                    break;
                case 'backNext':
                    $dom
                        .stop(false, false, true)
                        .css({
                            opacity: 1
                        })
                        .removeClass('swiper-curItem')
                        .addClass('swiper-nextItem')
                        .animate(beNext, animateSpeed);
                    break;
                case 'fade':
                    $dom
                        .stop(false, false, true)
                        .removeClass('swiper-preItem')
                        .animate(beFade, animateSpeed);
                    break;
                case 'backHide':
                    $dom
                        .stop(false, false, true)
                        .removeClass('swiper-nextItem')
                        .animate(beFade, animateSpeed);
                    break;
            }
        };

        setCss = function ($dom, type) {
            switch (type) {
                case 'pre':
                    $dom.css(bePre);
                    break;
                case 'cur':
                    $dom.css(beCur);
                    break;
                case 'next':
                    $dom.css(beNext);
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
        setAnimate($($container.children()[preIndex]).addClass('swiper-preItem'), 'bePre');
        setAnimate($($container.children()[curIndex]).addClass('swiper-curItem'), 'beCur');
        setAnimate($($container.children()[nextIndex]).addClass('swiper-nextItem'), 'beNext');

        // 动画函数
        swiperGoNext = function (speed) {
            setAnimate($('.swiper-item[data-swiper-index=' + preIndex + ']'), 'fade', speed);
            setAnimate($('.swiper-item[data-swiper-index=' + curIndex + ']'), 'bePre', speed);
            setAnimate($('.swiper-item[data-swiper-index=' + nextIndex + ']'), 'beCur', speed);
            setAnimate($('.swiper-item[data-swiper-index=' + willShowIndex + ']'), 'beNext', speed);

            hasFadeIndex = preIndex;
            preIndex = curIndex;
            nextIndex = (curIndex + 2) % itemCount;
            willShowIndex = (curIndex + 3) % itemCount;
            curIndex = (curIndex + 1) % itemCount;

            setActiveDot(curIndex);
        };

        swiperGoPrev = function (speed) {
            setAnimate($('.swiper-item[data-swiper-index=' + hasFadeIndex + ']'), 'backPre', speed);
            setAnimate($('.swiper-item[data-swiper-index=' + preIndex + ']'), 'backCur', speed);
            setAnimate($('.swiper-item[data-swiper-index=' + curIndex + ']'), 'backNext', speed);
            setAnimate($('.swiper-item[data-swiper-index=' + nextIndex + ']'), 'backHide', speed);

            curIndex = (preIndex) % itemCount;
            hasFadeIndex = curIndex - 2 < 0 ? curIndex - 2 + itemCount : curIndex - 2;
            preIndex = curIndex - 1 < 0 ? curIndex - 1 + itemCount : curIndex - 1;
            nextIndex = (curIndex + 1) % itemCount;
            willShowIndex = (curIndex + 2) % itemCount;

            setActiveDot(curIndex);
        };

        // 定时器
        intervalId = setInterval(swiperGoNext, defaultOptions.speed);
    };
})(jQuery);