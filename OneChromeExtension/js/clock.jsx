/**
 * Created by Tea on 2016/6/11.
 */
var React = require('react');
var TomatoActions = require('./TomatoActions');

require('../stylus/clock.styl');

module.exports = React.createClass({
    handleLoop: function () {
        TomatoActions.handleLoop();
    },

    handleSwitch: function () {
        TomatoActions.handleSwitch();
    },

    render: function () {
        return (
            <div className="clock">
                <span className="clock__loop" onClick={this.handleLoop}></span>
                <span className="clock__time">{this.props.time}</span>
                <span className="clock__switch" onClick={this.handleSwitch}></span>
            </div>
        );
    }
});