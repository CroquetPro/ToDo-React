var React = require('react'),
    TodoStore = require('../stores/todo_store.js');


var DoneButton = React.createClass({
  handleDone: function(event){
    TodoStore.toggleDone(this.props.item.id);
  },

  render: function(){
    var status = this.props.item.done ? 'Undo' : 'Done';
    return(
      <button onClick={this.handleDone}>{status}</button>
    );
  }
});

module.exports = DoneButton;
