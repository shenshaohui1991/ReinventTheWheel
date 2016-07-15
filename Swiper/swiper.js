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
            bePre, beNext, beCur, beFade, beInit,
            $dots = $('<ul class="swiper-dots"></ul>'),
            $dot, intervalId, swiperGoNext, swiperGoPrev, setAnimate, setCss, setActiveDot;

        beInit = {
            left: '0',
            top: '10%',
            width: '80%',
            height: '80%',
            '-webkit-transform': 'translateZ(-600px)',
            '-moz-transform': 'translateZ(-600px)',
            transform: 'translateZ(-600px)',
            opacity: 0
        };
        bePre = {
            left: '-40%',
            top: '10%',
            width: '80%',
            height: '80%',
            opacity: 1
        };
        beNext = {
            left: '60%',
            top: '10%',
            width: '80%',
            height: '80%',
            opacity: 1
        };
        beCur = {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 1
        };
        beFade = {
            left: 0,
            width: '80%',
            height: '80%',
            opacity: 0
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

        // 居中
        $dots.css({marginLeft: -$dots.outerWidth() / 2 + 'px'});

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
                            '-webkit-transform': 'translateZ(-200px) rotateY(30deg)',
                            '-moz-transform': 'translateZ(-200px) rotateY(30deg)',
                            transform: 'translateZ(-200px) rotateY(30deg)'
                        })
                        .removeClass('swiper-curItem')
                        .addClass('swiper-preItem')
                        .animate(bePre, animateSpeed, function () {

                        });
                    break;
                case 'backPre':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(-200px) rotateY(30deg)',
                            '-moz-transform': 'translateZ(-200px) rotateY(30deg)',
                            transform: 'translateZ(-200px) rotateY(30deg)'
                        })
                        .addClass('swiper-preItem')
                        .animate(bePre, animateSpeed, function () {

                        });
                    break;
                case 'beCur':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(0) rotateY(0)',
                            '-moz-transform': 'translateZ(0) rotateY(0)',
                            transform: 'translateZ(0) rotateY(0)'
                        })
                        .removeClass('swiper-nextItem')
                        .addClass('swiper-curItem')
                        .animate(beCur, animateSpeed, function () {

                        });
                    break;
                case 'backCur':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(0) rotateY(0)',
                            '-moz-transform': 'translateZ(0) rotateY(0)',
                            transform: 'translateZ(0) rotateY(0)'
                        })
                        .removeClass('swiper-preItem')
                        .addClass('swiper-curItem')
                        .animate(beCur, animateSpeed, function () {

                        });
                    break;
                case 'beNext':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(-200px) rotateY(-30deg)',
                            '-moz-transform': 'translateZ(-200px) rotateY(-30deg)',
                            transform: 'translateZ(-200px) rotateY(-30deg)'
                        })
                        .addClass('swiper-nextItem')
                        .animate(beNext, animateSpeed, function () {

                        });
                    break;
                case 'backNext':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(-200px) rotateY(-30deg)',
                            '-moz-transform': 'translateZ(-200px) rotateY(-30deg)',
                            transform: 'translateZ(-200px) rotateY(-30deg)'
                        })
                        .removeClass('swiper-curItem')
                        .addClass('swiper-nextItem')
                        .animate(beNext, animateSpeed, function () {

                        });
                    break;
                case 'fade':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(-600px)',
                            '-moz-transform': 'translateZ(-600px)',
                            transform: 'translateZ(-600px)'
                        })
                        .removeClass('swiper-preItem')
                        .animate(beFade, animateSpeed, function () {

                        });
                    break;
                case 'backHide':
                    $dom
                        .stop(false, false, true)
                        .css({
                            '-webkit-transform': 'translateZ(-600px)',
                            '-moz-transform': 'translateZ(-600px)',
                            transform: 'translateZ(-600px)'
                        })
                        .removeClass('swiper-nextItem')
                        .animate(beFade, animateSpeed, function () {

                        });
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
        $('.swiper-container')
            .children()
            .filter('.swiper-item')
            .not('.swiper-preItem, .swiper-curItem, .swiper-nextItem')
            .css(beInit);

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

            setActiveDot(curIndex);
        };

        // 定时器
        intervalId = setInterval(swiperGoNext, defaultOptions.speed);
    };
})(jQuery);