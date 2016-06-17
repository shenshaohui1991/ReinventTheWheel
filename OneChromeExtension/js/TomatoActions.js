/**
 * Created by Tea on 2016/6/13.
 */
var Reflux = require('reflux');
var TomatoActions = Reflux.createActions([
    'handleSwitch',
    'handleLoop'
]);

TomatoActions.handleSwitch.preEmit = function () {
    console.log(arguments);
};

module.exports = TomatoActions;