var React = require('react'),
    TodoStore = require('../stores/todo_store.js'),
    DoneButton = require('./done_button.jsx'),
    TodoDetailView = require('./todo_detail_view.jsx');

var TodoListItem = React.createClass({
  getInitialState: function() {
    return({ shown: "hidden" });
  },

  handleClick: function(event) {
    var clicked = this.state.shown === "hidden" ? "shown" : "hidden";
    console.log(clicked);
    this.setState({shown: clicked});
  },

  render: function(){
    return(
      <div className="item">
        <div onClick={this.handleClick} className="title">{this.props.item.title}</div>
        <DoneButton item={this.props.item}/>
        <TodoDetailView display={this.state.shown} item={this.props.item}/>
      </div>
    );
  }
});

module.exports = TodoListItem;
