/**
 * Created by Tea on 2016/6/11.
 */
var React = require('react');

require('../stylus/clock.styl');

module.exports = React.createClass({
    handleLoop: function () {
        this.props.handleLoop();
    },

    handleSwitch: function () {
        this.props.handleSwitch();
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