/**
 * Created by shenshaohui on 2016/6/14.
 */
(function ($) {
    $.fn.swiper = function () {
        /**
         * 1. 创建重复的元素，添加类
         * 2. 设定定时器
         * 3. 设定动画类
         * */
        var $container = $(this), // 获得容器
            children = $container.children('.swiper-item'), // 滚动图片
            itemCount = children.length, // 实际元素数
            curIndex = 1,
            defaultOptions = {
                speed: 3000
            },
            $firstChild, $lastChild, intervalId, runSwiperItem;

        if (itemCount == 0) {
            // no children
            throw new Error('no swiper-item, please check it');
        }

        for (var i = 0, len = itemCount; i < len; i++) {
            //$(children[i]).data('swiperIndex', i + 1);
            $(children[i]).attr('data-swiper-index', i);
        }

        // 为无限滚动添加重复元素
        $firstChild = $(children[0]).clone().addClass('swiper-dupItem').attr('data-dup', '1');
        $lastChild = $(children[children.length - 1]).clone().addClass('swiper-dupItem').attr('data-dup', '1');
        $container.prepend($lastChild);
        $container.append($firstChild);

        // 初始化位置类
        $($container.children()[0]).addClass('swiper-preItem');
        $($container.children()[1]).addClass('swiper-curItem');
        $($container.children()[2]).addClass('swiper-nextItem');

        // 动画函数
        runSwiperItem = function () {
            var preClass, curClass, nextClass;

            if (curIndex == 0) {
                preClass = '.swiper-item.swiper-dupItem[data-swiper-index=' + (itemCount - 1) + ']';
                curClass = '.swiper-item[data-swiper-index=' + curIndex + ']';
                nextClass = '.swiper-item[data-swiper-index=' + (curIndex + 1) + ']';
            } else if (curIndex == itemCount - 1) {
                preClass = '.swiper-item[data-swiper-index=' + (curIndex - 1) + ']';
                curClass = '.swiper-item[data-swiper-index=' + curIndex + ']';
                nextClass = '.swiper-item.swiper-dupItem[data-swiper-index=0]';
            } else {
                preClass = '.swiper-item[data-swiper-index=' + (curIndex - 1) + ']';
                curClass = '.swiper-item[data-swiper-index=' + curIndex + ']';
                nextClass = '.swiper-item[data-swiper-index=' + (curIndex + 1) + ']';
            }

            curIndex = (curIndex + 1) % itemCount;

            $('.swiper-item').removeClass('swiper-preItem').removeClass('swiper-curItem').removeClass('swiper-nextItem');
            $(preClass).addClass('swiper-preItem');
            $(curClass).addClass('swiper-curItem');
            $(nextClass).addClass('swiper-nextItem');
        };

        // 定时器
        intervalId = setInterval(runSwiperItem, defaultOptions.speed);
    };
})(jQuery);