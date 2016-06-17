var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var Clock = require('./clock.jsx');
var TomatoStores = require('./TomatoStores');

require('../stylus/index.styl');

var Container = React.createClass({
    // auto unmount listener
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return TomatoStores.getState();
    },

    onStateChange: function () {
        console.log('onStateChange', arguments);
        this.setState(TomatoStores.getState());
    },

    componentDidMount: function () {
        this.unsubscribe = TomatoStores.listen(this.onStateChange);
    },

    render: function () {
        var date = new Date(this.state.time),
            result = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" +
                (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

        return <Clock time={result}/>
    }
});

ReactDOM.render(
    <Container />,
    document.getElementById('wrapper')
);