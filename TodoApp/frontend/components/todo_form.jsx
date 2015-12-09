var React = require('react'),
    TodoStore = require('../stores/todo_store.js');

var TodoForm = React.createClass({
  getInitialState: function() {
    return ({ title: "", body: "" });
  },

  updateTitle: function(event) {
    this.setState({ title: event.target.value });
  },

  updateBody: function(event) {
    this.setState({ body: event.target.value });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    TodoStore.create(this.state);
    this.setState({ title: "", body: "" });
  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Title:
        <input type="text"
               name="todo[title]"
               value={this.state.title}
               onChange={this.updateTitle}/>
        </label>

        <br/>

        <label>
        Body:
        <input type="text"
               name="todo[body]"
               value={this.state.body}
               onChange={this.updateBody}/>
        </label>

        <br/>

        <input type="submit" value="New Item"/>
      </form>
    );
  }


});

module.exports = TodoForm;
