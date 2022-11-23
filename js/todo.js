// var list = document.getElementById("list");
// var input_item = document.getElementById("input-item");
// var btn_add_todo = document.getElementById("btn-add-todo")

var $ = function (id) {
  return document.getElementById(id);
}

var list = $("list");
var input_item = $("input-item");
var btn_add_todo = $("btn-add-todo");
const storateName = 'todo_list';

var storate = {
  lsName: storateName,
  save: function (data) {
    localStorage.setItem(this.lsName, JSON.stringify(data))
  },
  read: function () {
    let data = localStorage.getItem(this.lsName);
    return JSON.parse(data);
  }
}

var todo_list = storate.read() || [];
// add to do list function
function addTodo(todo) {
  todo_list.push(todo);
  storate.save(todo_list);
}

function add_item() {
  if (input_item.value != "") {
    addTodo(input_item.value);
    input_item.value = "";
    show();
  } else {
    alert("Intert a item");
  }
}

show();
function show() {
  // list.innerHTML = "";
  html = "<tr> <th>Todo</th> <th>Task</th> </tr>"
  for (todo in todo_list) {
    html = html + "<tr><td>" + todo_list[todo] +
      "<td><button id='delete' onclick = 'removeTodo(" + todo + ") '> delete </button> </td> </tr>"
  }
  list.innerHTML = html;
}

function removeTodo(position) {
  todo_list.splice(position, 1);
  storate.save(todo_list);
  show();
}
