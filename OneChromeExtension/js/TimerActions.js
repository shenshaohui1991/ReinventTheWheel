/**
 * Created by Tea on 2016/6/13.
 */
var Reflux = require('reflux');
var TimerActions = Reflux.createActions([
    'handleSwitch',
    'handleLoop'
]);

TimerActions.handleSwitch.preEmit = function () {
    console.log('click switch');
};

TimerActions.handleLoop.preEmit = function () {
    console.log('click loop');
};

module.exports = TimerActions;