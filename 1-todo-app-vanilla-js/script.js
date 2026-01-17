document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-form");
  //console.log(todoForm);
  const todoInput = document.querySelector(".todo-input");
  const todoSubmit = document.querySelector(".todo-submit");
  const todoList = document.querySelector(".todo-list");
  //console.log("todoList", todoList);

  let editMode = false;
  let editItem = null;

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      //error handling
      if (editMode) {
        editItem.firstChild.textContent = todoText;
        todoSubmit.innerText = "Add Todo";
        editMode = false;
        editItem = null;
      } else {
        //add Todos
        addTodoItem(todoText);
      }

      todoInput.value = "";
    } else {
      alert("Please enter a valid text");
    }
  });

  todoList.addEventListener("click", function (event) {
    //to know what element we have clicked upon
    const target = event.target;

    if (target.tagName === "BUTTON") {
      const todoItem = target.parentNode;

      if (target.innerText === "❌") todoItem.remove(); //Will delete the todo
      else if (target.innerText === "✏") {
        editMode = true;
        editItem = todoItem;
        todoSubmit.innerText = "Edit Todo";
        todoInput.value = todoItem.firstChild.textContent;
        todoInput.focus();
      }
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    console.log("todoItem", todoItem);
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    //innerHTML is used to inject any html inside the todoItem= <li></li>
    todoItem.innerHTML = `<span>${todoText}</span>`;

    //innerText if want to inject any text between the editButton = <button></button>
    editButton.innerText = `✏`;
    removeButton.innerText = `❌`;

    //injecting all the elements into DOM

    //appendChild()-> adding after the todoItem
    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);

    //into DOM
    todoList.appendChild(todoItem);
  }
});
