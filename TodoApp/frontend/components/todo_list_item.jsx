var React = require('react'),
    TodoStore = require('../stores/todo_store.js');

var TodoListItem = React.createClass({
  handleDestroy: function(event) {
    // debugger
    TodoStore.destroy(this.props.item.id);
  },

  render: function(){
    return(
      <div>
        <div className="title">{this.props.item.title}</div>
        <div className="body">{this.props.item.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }
});

module.exports = TodoListItem;
