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
    return _todos;
  },

  fetch: function(){
    $.get('api/todos', {}, function(todos){
      _todos = todos;
    });
  },

  create: function(todo){
    $.post('api/todos', {todo: todo}, function(toCreate){
      _todos.push(toCreate);
      TodoStore.changed();
    });
  },

  destroy: function(id){
    var toDestroy = _todos.find(function(todo) {
      todo.id === id;
    });

    if(!toDestroy){ return;}

    $.delete('api/todos/' + id, {}, function(todo){
      _todos.splice(_todos.indexOf(todo), 1);
      TodoStore.changed();
    });
  },

  toggleDone: function(id){
    var toUpdate = _todos.find(function(todo) {
      todo.id === id;
    });

    var newStatus = (toUpdate.done) ? false : true;

    $.patch('api/todos/' + id, {todo: {done: newStatus}}, function(todo){
      toUpdate.done = newStatus;
      TodoStore.changed();
    });
  }
};

module.exports = TodoStore;
