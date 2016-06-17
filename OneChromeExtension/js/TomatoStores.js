/**
 * Created by Tea on 2016/6/13.
 */
var Reflux = require('reflux');
var TomatoActions = require('./TomatoActions');
var state = {
    timer: null,
    time: 25 * 60 * 1000
};

var TomatoStores = Reflux.createStore({
    init: function () {
        this.listenToMany(TomatoActions);
    },

    getState: function () {
        return state;
    },

    onHandleSwitch: function () {
        if (this.getState().timer) {
            clearInterval(this.getState().timer);
            this.getState().timer = null;
        } else {
            this.getState().timer = setInterval((function () {
                this.getState().time -= 1000;
                this.trigger();
            }).bind(this), 1000);
        }

        this.trigger();
    },

    onHandleLoop: function () {
        // do nothing now
    }
});

module.exports = TomatoStores;