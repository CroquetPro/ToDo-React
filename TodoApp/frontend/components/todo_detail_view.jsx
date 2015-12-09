var React = require('react'),
    TodoStore = require('../stores/todo_store.js');

var TodoDetailView = React.createClass({
  handleDestroy: function(event) {
    TodoStore.destroy(this.props.item.id);
  },

  render: function() {
    var toggle = this.props.display;
    var deleteButton = "delete " + this.props.display;
    return (
      <div className={toggle}>
        <div className="body" >{this.props.item.body}</div>
        <button className={deleteButton}
                onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }

});


module.exports = TodoDetailView;
