var React = require('react');

var TodoInput = React.createClass({
    handleKeyDown: function (e) {
        console.log(arguments);
    },

    render: function () {
        return (
            <input className="todos__input" type="text" onKeyDown={this.handleKeyDown} placeholder="请输入您的计划"/>
        );
    }
});

var Todo = React.createClass({
    render: function () {
        var todoItem = this.props.todo;
        return (
            <div className="todos__item">{todoItem}</div>
        );
    }
});

module.exports = React.createClass({
    render: function () {
        var todos = this.props.todos || [],
            todosArr = [];

        todos.map(function (todoItem) {
            todosArr.push(<Todo todo={todoItem}/>);
        });

        return (
            <div className="todos__container">
                <TodoInput/>
                {todosArr}
            </div>
        );
    }
});