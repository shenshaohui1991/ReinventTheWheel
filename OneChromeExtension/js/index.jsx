var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Clock = require('./clock.jsx');
var TimerStores = require('./TimerStores');

require('../stylus/index.styl');

var Container = React.createClass({
    // auto unmount listener
    mixins: [
        Reflux.ListenerMixin,
        Reflux.connect(TimerStores, 'timer')
    ],

    render: function () {
        var date = new Date(this.state.timer.relaxTimer ? this.state.timer.relaxTime : this.state.timer.time),
            result = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" +
                (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()),
            switchStatus = this.state.timer.switch,
            loopStatus = this.state.timer.loop,
            isRelax = !!this.state.timer.relaxTimer;

        return <Clock time={result} switch={switchStatus} loop={loopStatus} relax={isRelax}/>
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById('wrapper')
);