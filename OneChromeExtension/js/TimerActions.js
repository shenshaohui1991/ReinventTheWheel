/**
 * Created by Tea on 2016/6/13.
 */
var Reflux = require('reflux');
var TimerActions = Reflux.createActions([
    'handleSwitch',
    'handleLoop'
]);

module.exports = TimerActions;