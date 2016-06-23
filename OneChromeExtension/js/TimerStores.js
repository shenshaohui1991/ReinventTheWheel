/**
 * Created by Tea on 2016/6/13.
 */
var Reflux = require('reflux');
var TimerActions = require('./TimerActions');
var workTime = 5 * 1000,
    relaxTime = 3 * 1000,
    state = {
        loop: false,
        switch: false,
        timer: null,
        time: workTime,
        relaxTimer: null,
        relaxTime: relaxTime
};

var TimerStores = Reflux.createStore({
    listenables: TimerActions,

    getInitialState: function () {
        return state;
    },

    onHandleSwitch: function () {
        if (state.timer) {
            clearInterval(state.timer);
            state.timer = null;
            state.switch = false;

            this.trigger(state);
        } else {
            state.timer = setInterval(this.startWorkTimer, 1000);
            state.switch = true;

            this.trigger(state);
        }
    },

    startWorkTimer: function () {
        if (state.time > 0) {
            state.switch = true;
            state.time -= 1000;
        } else if (state.loop) {
            state.switch = true;
            clearInterval(state.timer);
            state.timer = null;
            state.time = workTime;

            // 开启休息计时器
            state.relaxTimer = setInterval(this.startRelaxTimer, 1000);
        } else {
            // 关闭计时器,重置时间
            state.switch = false;
            clearInterval(state.timer);
            state.timer = null;
            state.time = workTime;
        }

        this.trigger(state);
    },

    startRelaxTimer: function () {
        if (state.relaxTime >= 1000) {
            state.relaxTime -= 1000;
        } else {
            clearInterval(state.relaxTimer);
            state.relaxTimer = null;
            state.relaxTime = relaxTime;
            state.time = workTime;

            if (state.loop) {
                state.timer = setInterval(this.startWorkTimer, 1000);
            }
        }

        this.trigger(state);
    },

    onHandleLoop: function () {
        state.loop = !state.loop;
        this.trigger(state);
    }
});

module.exports = TimerStores;