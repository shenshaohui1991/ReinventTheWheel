var React = require('react');
var ReactDOM = require('react-dom');
var Clock = require('./clock.jsx');

require('../stylus/index.styl');

var Container = React.createClass({
    getInitialState: function () {
        return {
            timer: null,
            time: 25 * 60 * 1000
        };
    },

    handleClockSwitch: function () {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({
                timer: null
            });
        } else {
            var timer = setInterval((function () {
                if (this.state.time < 1000) {
                    clearInterval(this.state.timer);
                    this.setState({
                        timer: null,
                        time: 25 * 60 * 1000
                    });
                } else {
                    this.setState({
                        time: this.state.time - 1000
                    });
                }
            }).bind(this), 1000);
            this.setState({
                timer: timer
            });
        }
    },

    handleClockLoop: function () {
        console.log('click loop');
    },

    render: function () {
        var date = new Date(this.state.time),
            result = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" +
                (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

        return <Clock handleSwitch={this.handleClockSwitch}
                      handleLoop={this.handleClockLoop} time={result}/>
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById('wrapper')
);