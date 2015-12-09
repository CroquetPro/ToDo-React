var React = require('react'),
    TodoStore = require('../stores/todo_store.js'),
    TodoListItem = require('./todo_list_item.jsx'),
    TodoForm = require('./todo_form.jsx');

var TodoList = React.createClass({
  getInitialState: function() {
    return ({ list: TodoStore.all() });
  },

  todosChanged: function(){
    this.setState({ list: TodoStore.all() });
  },

  componentDidMount: function() {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  render: function() {
    console.log(this.state.list);
    var list = this.state.list.map(function(item){
      return <TodoListItem key={item.id} item={item}/>;
    });

    return (
            <div className="list">
                {list}
                <hr></hr>
                <TodoForm/>
            </div>
          );
  }


});

module.exports = TodoList;
