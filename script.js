//Selectors
const TodoInput = document.querySelector(".todo-input");
const TodoButton = document.querySelector(".todo-button");
const TodoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Functions
function addTodo(event) {
  event.preventDefault();

  // Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create new list item
  const newTodo = document.createElement("li");
  newTodo.innerText = TodoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Save to local storage
  saveLocalTodos(TodoInput.value);

  // Create complete button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  // Create delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append todoDiv to todoList
  TodoList.appendChild(todoDiv);

  // Clear input value
  TodoInput.value = "";
}

// Delete and check todos
function deleteTodos(e) {
  const item = e.target;
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.classList.add("fall");

    // Remove from local storage
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check if complete button was clicked
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter todos
function filterTodo(e) {
  const todos = TodoList.childNodes;
  todos.forEach((todo) => {
    if (todo.nodeType === 1) {
      // Ensures we only work with element nodes
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

// Save to local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove from local storage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoText = todo.children[0].innerText;
  todos = todos.filter((t) => t !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get todos from local storage when page reloads
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create list item
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Create complete button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append todoDiv to todoList
    TodoList.appendChild(todoDiv);
  });
}

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); // Added to load todos when the page loads
TodoButton.addEventListener("click", addTodo);
TodoList.addEventListener("click", deleteTodos);
filterOption.addEventListener("click", filterTodo);
