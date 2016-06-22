/**
 * Created by Tea on 2016/6/11.
 */
var React = require('react');
var TomatoActions = require('./TimerActions');

require('../stylus/clock.styl');

module.exports = React.createClass({
    handleLoop: function () {
        TomatoActions.handleLoop();
    },

    handleSwitch: function () {
        TomatoActions.handleSwitch();
    },

    render: function () {
        var switchClazz = this.props.switch ? 'clock__switch clock__switch--disabled' : 'clock__switch',
            loopClazz = this.props.loop ? 'clock__loop' : 'clock__loop clock__loop--disabled',
            timeClazz = this.props.relax ? 'clock__time--relax' : 'clock__time',
            timeStr = (this.props.relax ? '休息时间剩余: ' : '工作时间剩余: ') + this.props.time;
        
        return (
            <div className="clock">
                <span className={loopClazz} onClick={this.handleLoop}></span>
                <span className={timeClazz}>{timeStr}</span>
                <span className={switchClazz} onClick={this.handleSwitch}></span>
            </div>
        );
    }
});