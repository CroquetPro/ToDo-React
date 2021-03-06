var _todos = [];
var _callbacks = [];

var TodoStore = {
  changed: function() {
    _callbacks.forEach(function(callback) {
      callback();
    });
  },

  addChangedHandler: function(callback) {
    _callbacks.push(callback);
  },

  removeChangedHandler: function(callback) {
    for (var i = 0; i < _callbacks.length; i++) {
      if (_callbacks[i] === callback){
        _callbacks.splice(i, 1); // maybe save as var idx
        break;
      }
    }
  },

  all: function(){
    return _todos.slice();
  },

  fetch: function(){
    $.get('api/todos', {}, function(todos){
      _todos = todos;
      TodoStore.changed();
    });
  },

  create: function(data){
    $.post('api/todos', {todo: data}, function(toCreate){
      _todos.push(toCreate);
      TodoStore.changed();
    });
  },

  destroy: function(id){
    var callback = function(deletedTodoItem){
      var oldTodo = _todos.find(function(items) {
        return deletedTodoItem.id === items.id;
      });
      if(typeof oldTodo === 'undefined'){
        TodoStore.changed();
        return;
      }

      _todos.splice(_todos.indexOf(oldTodo), 1);
      TodoStore.changed();
    };

    $.ajax({
      url: 'api/todos/' + id,
      type: 'DELETE',
      success: callback
    });
  },

  toggleDone: function(id){
    var toUpdate = _todos.find(function(todo) {
      return todo.id === id;
    });

    var newStatus = !toUpdate.done;

    var callback = function(todo){
      toUpdate.done = newStatus;
      TodoStore.changed();
    };

    $.ajax({
      url: 'api/todos/' + id,
      type: 'PATCH',
      data: {todo: {done: newStatus}},
      success: callback,
    });
  }
};

module.exports = TodoStore;
