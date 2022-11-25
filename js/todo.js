// hàm lấy id 
var $ = function (id) {
  return document.getElementById(id);
}

// lấy id từ html
var list = $("list");
var input_item = $("input-item");
var btn_add_todo = $("btn-add-todo");
var task_day = $("task-day");

// tạo khóa có tên todo_list để lưu trong localstorage
const storateName = 'todo_list';

//tạo 1 đối tượng có tên storage, có thuộc tính lafls Name, và 2 phương thức
// save: lưu dữ liệu vào biến localstorage, read để đọc dữ liệu từ biến localstorage
var storage = {
  lsName: storateName,
  save: function (data) {
    localStorage.setItem(this.lsName, JSON.stringify(data))
  },
  read: function () {
    let data = localStorage.getItem(this.lsName);
    return JSON.parse(data);
  }
}
// tạo biến todo_list để đọc giá trị từ localstorage, nếu chưa có thì todolist = []
var todo_list = storage.read() || [];

// Hàm thêm công việc có 2 tham số là todo (tên cv) task_day ngày hoàn thành
function addTodo(todo, task_day) {
  // biến kiểm tra ban đầu = true, chưa có trùng lặp
  var check = true
  // duyệt qua từng phần trử trong danh sách todo_list
  for (var i in todo_list) {
    // Nếu phần tử nhập vào đã có trong danh sách todo_list
    if (todo == todo_list[i]) {
      // thì bật cờ, và ngắt vòng lặp
      check = false;
      break;
    }
  }
  //sau khi thoát vòng lặp, nếu biến check == true, thì có nghĩa là phần tử nhập vào
  // không có trong danh sách
  if (check) {
    // tạo 1 đối tượng todos(nhiều công việc,) 
    var todos = {
      todo: todo,
      task_day: task_day
    }
    // thêm vào danh sách to_dolist các công việc trong todos
    todo_list.push(todos);
    // lưu danh sách todo_lít vào lại bên trong biến ở localstorage
    storage.save(todo_list);
  } else {
    alert("Task exits")
  }
  // show();
}

// hàm sự kiện được gọi khi click nút add
function add_item() {
  if (input_item.value != "") {
    // gọi hàm addTodo và truyền vào giá trị ở 2 ô bên html
    addTodo(input_item.value, task_day.value);
    // xóa trắng giá trị ở 2 ô bên html
    input_item.value = "";
    task_day.value = "";
    // hiển thị lại danh sách công việc ở trong bảng bằng cách gọi hàm show
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
    // console.log(todo_list[todo].task_day)
    html = html + "<tr><td>" + todo_list[todo].todo + "</td><td>" + todo_list[todo].task_day + "</td><td><button id='delete' onclick = 'removeTodo(" + todo + ") '> delete </button> </td> </tr>"
  }
  list.innerHTML = html;
}

function removeTodo(position) {
  todo_list.splice(position, 1);
  storage.save(todo_list);
  show();
}
