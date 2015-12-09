var React = require('react');

var TodoListItem = React.createClass({

  render: function(){
    return(
      <div>
        <div className="title">{this.props.item.title}</div>
        <div className="body">{this.props.item.body}</div>
      </div>
    );
  }
});

module.exports = TodoListItem;
